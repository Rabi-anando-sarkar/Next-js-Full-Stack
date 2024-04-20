import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {
                status: 401
            }
        )
    }

    const userId = user._id

    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage : acceptMessages },
            { new : true}
        )

        if(updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "failed to update user status accept messages"
                },
                {
                    status: 401
                }
            )
        } else {
            return Response.json(
                {
                    success: true,
                    message: "message acceptnace status updated succesfully",
                    updatedUser
                },
                {
                    status: 200
                }
            )
        }

    } catch (error) {
        console.log("failed to update user status accept messages");
        
        return Response.json(
            {
                success: false,
                message: "failed to update user status accept messages"
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "not authenticated"
            },
            {
                status:401
            }
        )
    }

    const userId = user._id

    try {
        const foundUser = await UserModel.findById(userId)
    
        if(!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "failed to found the user"
                },
                {
                    status: 404
                }
            )
        } else {
            return Response.json(
                {
                    success: true,
                    message: "is accepting messages",
                    isAcceptingMessages : foundUser.isAcceptingMessage
                },
                {
                    status: 200
                }
            )
        }
    } catch (error) {
        console.log("failed to update user status accept messages");
        
        return Response.json(
            {
                success: false,
                message: "Error in getting mesage acceptance status"
            },
            {
                status: 500
            }
        )
    }
}