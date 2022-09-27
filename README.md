# nodejs food recipe
env đã config, ai dùng về mongodb nhớ thay về uri của mình,
docker không cần quan tâm.
lưu ý ae lần sau push lên thì nên bỏ node_modules và env vào gitignors

ae trước khi dùng nên tìm hiểu qua chút về :
- Nodejs(tất nhiên rồi, chả lẽ lại C++)
- framework Express di ét
- MongoDB

1 số thư viện cần quan tâm :
- jsonwebtoken <br>
- mongoose
- passport
- cors
(chưa nghĩ tiếp)

ae cũng nên tìm hiểu qua chút về mẫu thiết kế như:
- singleton pattern
- factory builder

Khi chạy chỉ cần gõ npm i sau đó npm start chạy cổng 3000;

Cấu trúc thư mục (cái này viết kiểu mvc) :
-----src---|--api (chứa các api và endpoint)
           |--cli (chứa các command tác vụ chạy ngầm và dùng các cron job)
           |--controllers (chứa các controllers)
           |--middlewares (chứa các js về middlewares)
           |--models (chứa các schema về models database(cái này thì tìm hiểu về mongoose))
           |--request (chứa validation các form request trước khi thực hiện controllers)
           |--resources (chứa images,html,css,js public, nói chung cái này đéo quan tâm lắm vì viết API)
           |--routes (khai báo các routes liên kết controllers để app sử dụng được)
           |--services (dịch vụ ngoài, cái này tính có thêm được gì thì thêm,kiểu third party, cors, cache,v....)
           |--utils (các module dùng chung, ví dụ function dùng chung cho nhiều file)
           |--storage (lưu trữ ảnh của web)
-node_modu-|--cái này cút,thư viện thôi
--services-|--giống services bên trên,định viết theo kiểu microservices nhưng đéo biết làm vì khó vcl.
--index.js-|--cái này đéo biết thì nghỉ bà nó đi.:))))

okela ae ,giải thích xong .Có gì ko hiểu thì hỏi.Có thể thư mục bên trên sẽ cải tiến thêm chút.Với lại dm mấy con chó viết code bẩn nhé.thêm coding convention đi.

tym <3
