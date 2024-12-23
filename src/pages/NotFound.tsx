import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">
        404 - Sayfa Bulunamadı
      </h1>
      <p className="text-xl text-gray-600 mt-4">
        Oops! Aradığın sayfanın platformumuzda olduğuna emin misin?
      </p>
      <Link
        to="/"
        className="mt-6 text-lg text-blue-500 border border-blue-500 px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
};

export default NotFoundPage;
