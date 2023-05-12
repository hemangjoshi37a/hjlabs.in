import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_links(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = set()
    
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and not href.startswith('#') and (href.startswith('http://') or href.startswith('https://')):
            full_url = urljoin(url, href)
            links.add(full_url)
    
    return links


def generate_sitemap(start_url):
    visited = set()
    to_visit = [start_url]

    while to_visit:
        current_url = to_visit.pop()
        if current_url not in visited:
            visited.add(current_url)
            links = get_links(current_url)
            to_visit.extend(links)
    
    return visited

if __name__ == "__main__":
    start_url = "http://127.0.0.1:8080"
    sitemap_urls = generate_sitemap(start_url)

    with open('sitemap.xml', 'w') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

        for url in sitemap_urls:
            f.write('  <url>\n')
            f.write(f'    <loc>{url}</loc>\n')
            f.write('  </url>\n')

        f.write('</urlset>\n')

