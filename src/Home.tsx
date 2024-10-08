import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import {
  BusyIndicator,
  FlexBox,
  FlexBoxDirection,
  Icon,
  Input,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  TableRowType,
} from "@ui5/webcomponents-react";
import { useResponsiveContentPadding } from "@ui5/webcomponents-react-base";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./assets/mockData/movies.json";
import { revenueFormatter } from "./utils.ts";

export const Home = () => {
  const containerRef = useRef(null);
  const responsivePaddingClass = useResponsiveContentPadding(
    containerRef.current!,
  );
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleRowClick = (e) => {
    const { row } = e.detail;
    navigate(`/details/${row.dataset.id}`);
  };
  const handleSearchInput = (e) => {
    const { value } = e.target;
    setFilteredData(
      data.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          String(item.year).includes(value),
      ),
    );
  };

  return (
    <FlexBox
      className={responsivePaddingClass}
      style={{ paddingBlock: "1rem" }}
      direction={FlexBoxDirection.Column}
      ref={containerRef}
    >
      <Input
        placeholder="Search Movies"
        onInput={handleSearchInput}
        icon={<Icon name={searchIcon} />}
        style={{ width: "300px" }}
      />
      <BusyIndicator>
        <Table
          columns={
            <>
              <TableColumn>Title</TableColumn>
              <TableColumn minWidth={600} demandPopin popinText="Year">
                Year
              </TableColumn>
              <TableColumn minWidth={600} demandPopin popinText="Revenue">
                Revenue
              </TableColumn>
            </>
          }
          onRowClick={handleRowClick}
        >
          {filteredData?.map((movie) => {
            return (
              <TableRow
                key={movie.id}
                type={TableRowType.Active}
                data-id={movie.id}
              >
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{revenueFormatter.format(movie.revenue)}</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </BusyIndicator>
    </FlexBox>
  );
};
