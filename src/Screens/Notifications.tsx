import { useEffect, useState } from "react";
import {
  getAllNotifications,
  updateNotification,
} from "../Features/User/userSlice";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { INotification, INotifications } from "../Features/User/type";

export const Notifications = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.user);
  const [response, setResponse] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [allNotification, setAllNotification] = useState<INotifications>();
  const [buyersNotifications, setBuyersNotifications] =
    useState<INotification[]>();
  const [vendorsNotifications, setVendorsNotifications] =
    useState<INotification[]>();
  const [isBuyers, setIsBuyers] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<INotification[]>();

  useEffect(() => {
    if (notifications) {
      setAllNotification(notifications);
    }
  }, [notifications]);

  useEffect(() => {
    if (allNotification) {
      const buyers = allNotification?.data.filter(
        (notification) => notification.commutername != ""
      );

      setBuyersNotifications(buyers);
    }
  }, [allNotification]);

  useEffect(() => {
    if (allNotification) {
      const vendors = allNotification?.data.filter(
        (notification) => notification.vendorname != ""
      );

      setVendorsNotifications(vendors);
    }
  }, [allNotification]);

  useEffect(() => {
    dispatch(getAllNotifications(1));
  }, [dispatch]);

  function timeAgo(dateString: string): string {
    const now = new Date().getTime();
    const date = new Date(dateString).getTime();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000, // 365 days * 24 hours * 60 minutes * 60 seconds
      month: 2592000, // 30 days * 24 hours * 60 minutes * 60 seconds
      week: 604800, // 7 days * 24 hours * 60 minutes * 60 seconds
      day: 86400, // 24 hours * 60 minutes * 60 seconds
      hour: 3600, // 60 minutes * 60 seconds
      minute: 60, // 60 seconds
      second: 1,
    };

    if (seconds < intervals.minute) {
      return `${Math.floor(seconds)} second${
        Math.floor(seconds) !== 1 ? "s" : ""
      } ago`;
    } else if (seconds < intervals.hour) {
      const minutes = Math.floor(seconds / intervals.minute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (seconds < intervals.day) {
      const hours = Math.floor(seconds / intervals.hour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (seconds < intervals.week) {
      const days = Math.floor(seconds / intervals.day);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (seconds < intervals.month) {
      const weeks = Math.floor(seconds / intervals.week);
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else if (seconds < intervals.year) {
      const months = Math.floor(seconds / intervals.month);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(seconds / intervals.year);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  }

  // Example usage:
  // console.log(timeAgo("2024-09-17T09:58:33.674787Z")); // Adjust to your date format

  return (
    <div className="bg-slate-100 w-[90%] mx-auto my-10 pb-10 rounded-2xl min-h-[300px]">
      <div className="flex items-center">
        <div
          onClick={() => {
            setIsBuyers(false);
            setSelectedNotification(buyersNotifications);
          }}
          className={`text-xl ${
            !isBuyers && "text-orange-700 border-b-[1.5px] border-b-orange-700"
          } mt-5 ml-10 pb-3 font-bold cursor-pointer`}
        >
          Vendors Notifications
        </div>
        <div
          onClick={() => {
            setIsBuyers(true);
            setSelectedNotification(vendorsNotifications);
          }}
          className={`text-xl ${
            isBuyers && "text-orange-700 border-b-[1.5px] border-b-orange-700"
          } mt-5 ml-10 pb-3 font-bold cursor-pointer`}
        >
          Buyers Notifications
        </div>
      </div>
      <hr className="border-slate-400 w-full" />

      {selectedNotification?.map((notification, index) => (
        <div
          key={index}
          className="px-5 pb-5 w-[94%] ml-[3%] mt-5 border-[5px]"
        >
          <div className="w-fit ml-auto font-medium text-slate-400    ">
            {timeAgo(notification.createdat)}
          </div>
          <div className="text-lg text-orange-800 font-medium font-poppins">
            {notification.vendorname}
          </div>
          <div className="text-justify">{notification.question}</div>
          <div className="text-justify ml-10 mt-7 italic">
            <h1 className="font-bold text-orange-700">Response</h1>
            {notification.response}
          </div>
          {notification.repliedby === "" && (
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
          {notification.repliedby === "" && (
            <button
              className="bg-orange-200 px-5 py-2 rounded-md mt-3 text-sm font-semibold"
              onClick={() => {
                if (response) {
                  const payload = {
                    id: notification.id,
                    isadminread: true,
                    response: response,
                  };
                  dispatch(updateNotification(payload));
                  setIsReply(!isReply);
                }
              }}
            >
              {!isReply ? "Reply" : "Send"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
