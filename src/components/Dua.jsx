import React from "react";
import img from "../assets/dua/2.jpeg";
import { useNavigate } from "react-router-dom";

const Dua = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="card-elevated max-w-3xl w-full p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-full">
            <h2 className="text-lg text-center font-bold text-slate-800">
              The Right Path
            </h2>
            <p className="text-sm text-slate-600 text-center">Islamic Corner</p>
          </div>
        </div>

        <div className="prose text-center max-w-none text-slate-700">
          <p>
            السلام علیکم ورحمتہ اللہ وبرکاتہ۔ امید ہے آپ سب بخیر و عافیت ہوں گے۔
          </p>
          <img
            src={img}
            alt="cover"
            className="w-72 m-auto py-4 rounded-lg object-cover"
          />
          <p>
            خواہش ہے کہ آپ میرے ساتھ خوشی بانٹیں۔ اس پیج پر آپ روزانہ کے اعمال
            نوٹ کر سکتے ہیں اور اپنا نتیجہ پی ڈی ایف میں ڈاؤن لوڈ کر سکتے ہیں۔
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/checklist")}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-md py-2 px-4 shadow"
          >
            Next — Checklist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dua;
