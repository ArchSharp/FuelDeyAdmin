import { useState } from "react";

export const Notifications = () => {
  const [response, setResponse] = useState("");
  const [isReply, setIsReply] = useState(false);

  return (
    <div className="bg-slate-100 w-[90%] mx-auto my-10 pb-10 rounded-2xl min-h-[300px]">
      <div className="flex items-center">
        <div className="text-xl text-orange-700 border-b-[1.5px] border-b-orange-700 mt-5 ml-10 pb-3 font-bold cursor-pointer">
          Vendors Notifications
        </div>
      </div>
      <hr className="border-slate-400 w-full" />
      <div className="px-5 pb-5 w-[94%] ml-[3%] mt-5 border-[5px]">
        <div className="w-fit ml-auto font-medium text-slate-400    ">
          15 mins ago
        </div>
        <div className="text-lg text-orange-800 font-medium font-poppins">
          Mobil Apapa
        </div>
        <div className="text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          quis incidunt sit perferendis quia? Voluptatibus saepe aliquid
          consequatur magni at temporibus, aut a quisquam optio repellat
          praesentium natus ex magnam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Delectus repudiandae asperiores quis facilis cum
          enim. Deserunt laudantium quasi, assumenda magni quisquam sunt. Ipsam
          consectetur esse laudantium nisi dignissimos voluptatibus quod?
        </div>
      </div>

      <div className="px-5 pb-5 w-[94%] ml-[3%] mt-5 border-[5px]">
        <div className="w-fit ml-auto font-medium text-slate-400    ">
          2 days ago
        </div>
        <div className="text-lg text-orange-800 font-medium font-poppins">
          NNPC Ikeja
        </div>
        <div className="text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          quis incidunt sit perferendis quia? Voluptatibus saepe aliquid
          consequatur magni at temporibus, aut a quisquam optio repellat
          praesentium natus ex magnam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Delectus repudiandae asperiores quis facilis cum
          enim. Deserunt laudantium quasi, assumenda magni quisquam sunt. Ipsam
          consectetur esse laudantium nisi dignissimos voluptatibus quod?
        </div>
        <div className="text-justify ml-10 mt-7 italic">
          <h1 className="font-bold text-orange-700">Response</h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
          quis incidunt sit perferendis quia? Voluptatibus saepe aliquid
          consequatur magni at temporibus, aut a quisquam optio repellat
          praesentium natus ex magnam.
        </div>
        {isReply && (
          <textarea
            className="mt-7 p-3 w-[60%] border-2 bg-gray-300 rounded-xl"
            id="response"
            name="response"
            rows={4}
            placeholder="type response"
            value={response}
            onChange={(e) => setResponse(e.currentTarget.value)}
          />
        )}
        <br />
        <button
          className="bg-orange-200 px-5 py-2 rounded-md mt-3 text-sm font-semibold"
          onClick={() => setIsReply(!isReply)}
        >
          {!isReply ? "Reply" : "Send"}
        </button>
      </div>
    </div>
  );
};
