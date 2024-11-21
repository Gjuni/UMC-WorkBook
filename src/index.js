import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
// import { getInfo } from "prisma";

import { handleUserInfo, handleUserSignUp } from "./controllers/user.controllers.js";
import { handleStoreLocationInfo, handleStoreUpdateIndex } from "./controllers/store.controllers.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup({}, {
      swaggerOptions: {
        url: "/openapi.json",
      },
    })
  );

  app.get("/openapi.json", async (req, res, next) => {
    // #swagger.ignore = true
    const options = {
      openapi: "3.0.0",
      disableLogs: true,
      writeOutputFile: false,
    };
    const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
    const routes = ["./src/index.js"];
    const doc = {
      info: {
        title: "UMC 7th",
        description: "UMC 7th Node.js 테스트 프로젝트입니다.",
      },
      host: "localhost:3000 ",
    };
  
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
  });
  

app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({resultType : "SUCCESS", error : null, success});
    };

    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType : "FAIL",
            error : {errorCode, reason, data},
            success : null,
        });
    };
    next();
});


app.use(cors());                              // cors 방식 허용
app.use(express.static('public'));            // 정적 파일 접근
app.use(express.json());                      // request의 본문을 json으로 해석할 수 있도록 함 (Json 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended:false})) // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/" , (res, req) => {
    res.send("Hello world!");
});

// user info
// app.post("/users/signup", handleUserSignUp);/
app.get("/users/info", handleUserInfo);


// store info
app.get("/stores/info", handleStoreLocationInfo);
app.post("/stores/update", handleStoreUpdateIndex);

// review info
app.post("/reviews/update", handleReviewUpdateIndex);


// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
    if(res.headersSent) {
        return next(err);
    }

    // 각 에러처리를 해줌 해당 케이스에서 못 잡은 에러를 잡아주는 역할
    res.status (err.statusCode || 500).error ({
        errorCode : err.errorCode || "unknown",
        reason : err.reason || err.message || null,
        data : err.data || null,
    });
});


app.listen(port, () => {
    console.log(`listening port ${port}`);
});