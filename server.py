import os
import re
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            parts = self.path.split('?')
            if not parts[0].endswith('/'):
                self.send_response(301)
                new_parts = (parts[0] + '/',) + tuple(parts[1:])
                new_url = '?'.join(new_parts)
                self.send_header("Location", new_url)
                self.end_headers()
                return None
            for index in "index.html", "index.htm":
                index_path = os.path.join(path, index)
                if os.path.exists(index_path):
                    path = index_path
                    break
            else:
                return super().send_head()

        ctype = self.guess_type(path)
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        size = fs.st_size

        # Handle Range header
        range_header = self.headers.get('Range')
        if range_header:
            match = re.match(r'^bytes=(\d*)-(\d*)$', range_header)
            if match:
                start, end = match.groups()
                start = int(start) if start else 0
                end = int(end) if end else size - 1
                if 0 <= start <= end < size:
                    self.send_response(206)
                    self.send_header('Content-Type', ctype)
                    self.send_header('Accept-Ranges', 'bytes')
                    self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
                    self.send_header('Content-Length', str(end - start + 1))
                    self.end_headers()
                    f.seek(start)
                    self.range_end = end
                    self.range_start = start
                    return f

        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(size))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        self.range_end = size - 1
        self.range_start = 0
        return f

    def copyfile(self, source, outputfile):
        if not hasattr(self, 'range_end'):
            return super().copyfile(source, outputfile)
        bytes_to_send = self.range_end - self.range_start + 1
        bufsize = 64 * 1024
        while bytes_to_send > 0:
            read_size = min(bufsize, bytes_to_send)
            buf = source.read(read_size)
            if not buf:
                break
            outputfile.write(buf)
            bytes_to_send -= len(buf)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8085
    server_address = ('', port)
    httpd = HTTPServer(server_address, RangeRequestHandler)
    print(f"Serving HTTP on port {port} with Range support...")
    httpd.serve_forever()
