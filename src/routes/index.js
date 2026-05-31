import { Router } from "express";

export const apiRouter = Router();

/** 仕様確定後にドメイン別ルーターをマウントする */
apiRouter.get("/", (_req, res) => {
  res.json({ message: "API root — ルートは仕様に合わせて追加してください" });
});
