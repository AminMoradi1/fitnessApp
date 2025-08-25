import NutritionPage from "@/components/template/NutritionPage";
import React from "react";

function Nutrition() {
  return (
    <div>
      <p style={{marginTop:"80px" , width:"300px" , marginRight:"10px" , fontWeight:"400"}}>
        باکس پایین رو با دقت پر کن
        <br /> تا یه برنامه مخصوص خودت برات طراحی کنم🔥
        بدون یه برنامه غذایی هدفمند , رسیدن به بدن رویاییت ناممکنه🤧
      </p>
      <NutritionPage />
    </div>
  );
}

export default Nutrition;
