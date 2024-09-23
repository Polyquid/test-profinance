import { RootState } from "@/store";
import StatementFilter from "./StatementFilter";
import StatementInteraction from "./StatementInteraction";
import StatementTable from "./StatementTable";
import { useSelector } from "react-redux";

const Statement = () => {
  const data = useSelector((state: RootState) => state.listData.data)
  const filters = data.length > 0 ? Object.keys(data[0]) : [];
  const filtersPlaceholder = data[0] ?? {};
  return (
    <div className="w-3/4">
      <StatementFilter
        filters={filters}
        filtersPlaceholder={filtersPlaceholder}
      />
      <StatementInteraction />
      <StatementTable headers={filters} />
    </div>
  )
};

export default Statement;