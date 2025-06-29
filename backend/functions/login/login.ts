import { BadRequest } from "http-errors";
import { User } from "../user/createUser";
import jwt from "jsonwebtoken";
import { config } from "mssql";
import handleSuccess from "../handleSuccess";
import { handleError } from "../handleError";
import { Response } from "express";
import checkUser from "../user/checkUser";

const login = async ({
  user,
  config,
  res,
}: {
  user: User;
  config: config;
  res: Response;
}) => {
  try {
    const result: User | null = await checkUser({ config, user });

    if (!result) {
      throw new BadRequest("User Not found");
    }

    let token = jwt.sign(
      { Guid: result.Guid, Email: result.Email, Username: result.Username },
      process.env.JWT as string,
      {
        expiresIn: "15m",
      }
    );

    res.clearCookie("session", { path: "/" });

    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    const returnUser = {
      Guid: result.Guid,
      Username: result.Username,
      Email: result.Email,
    };

    handleSuccess(returnUser, 200, res);
  } catch (err) {
    handleError(err, res);
  }
};

export default login;
