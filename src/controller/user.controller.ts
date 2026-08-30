import type { Request, Response } from "express";


export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email } = req.body;

    // const user = await User.create({
    //   name,
    //   email,
    // });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    //   data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};