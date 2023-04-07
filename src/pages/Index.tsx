import React from "react";
import { Link } from "react-router-dom";

export default function Index<ReactNode>() {
  return (
    <React.Fragment>
      <div className="px-10 py-3">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl capitalize h-[40vh] p-5">
            <div className="flex items-center">
              <div>Spending stats</div>
              <div className="flex items-center">
                <div>Personal</div>
                <div>Business</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="bg-white rounded-xl capitalize h-[43vh] p-5 col-span-3">
            <div className="flex items-center">
              <div>Spending stats</div>
              <div className="flex items-center">
                <div>Personal</div>
                <div>Business</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 grid-rows-4">
            <div className="bg-white rounded-xl capitalize h-full p-5 row-span-3">
              as
            </div>
            <div className="bg-white rounded-xl capitalize h-full p-5">
              as
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}