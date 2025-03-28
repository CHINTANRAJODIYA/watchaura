import { Button } from "flowbite-react";
import React from "react";

function CategorCard() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-3">
      <a href="#">
        <img className="rounded-t-lg" src="i3.png" alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <Button className="mx-auto mt-3" gradientDuoTone="greenToBlue" outline>
          More info
        </Button>
      </div>
    </div>
  );
}

export default CategorCard;
