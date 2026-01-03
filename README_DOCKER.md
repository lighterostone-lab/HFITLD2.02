Hướng dẫn build và chạy Docker image cho project này

Nội dung:

- Tệp `www/` là trang web tĩnh (game export). Dockerfile dùng `nginx` để phục vụ nội dung này.

Build image (tại thư mục gốc của repo):

```bash
docker build -t her-fall-web:latest .
```

Chạy container và map cổng 80 của nginx tới cổng 8080 trên máy host:

```bash
docker run -d -p 8080:80 --name her-fall-web her-fall-web:latest
```

Mở trình duyệt tới `http://localhost:8080` để xem.

Ghi chú:

- Dockerfile chỉ copy thư mục `www/` vào nginx; các file `.pak` lớn nằm ngoài `www/` sẽ không được đóng gói (đã thêm `.dockerignore`).
- Nếu bạn muốn một server node thay vì nginx, tôi có thể tạo Dockerfile thay thế.
