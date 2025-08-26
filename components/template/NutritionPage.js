import ProgramForm from "@/components/module/ProgramForm";
import { PiBowlFoodFill } from "react-icons/pi";

export default function NutritionPage() {
  return (
    <ProgramForm
      type="nutrition"
      endpoint="/api/nutrition/request"
      icon={<PiBowlFoodFill style={{ color: "rgb(124, 58, 237)" }} />}
      title="درخواست برنامه غذایی"
      extraFields={[
        {
          type: "checkbox",
          name: "experience",
          label: " قبلاً رژیم غذایی داشتم",
        },
      ]}
    />
  );
}
