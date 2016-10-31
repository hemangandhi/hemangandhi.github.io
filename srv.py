#!/usr/bin/env python3

import http.server as s

r = s.HTTPServer(("localhost", 8080), s.SimpleHTTPRequestHandler)
r.serve_forever()
