import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import {
  BusyIndicator,
  FlexBox,
  FlexBoxDirection,
  Icon,
  Input,
  Table,
  TableCell,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "@ui5/webcomponents-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./assets/mockData/movies.json";
import { revenueFormatter } from "./utils.ts";

export const Home = () => {
  const containerRef = useRef(null);
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
    <div className="sap-container-type-inline-size">
      <FlexBox
        className={"sap-content-paddings-container"}
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
            style={{ width: "100%" }}
            overflowMode="Popin"
            headerRow={
              <TableHeaderRow>
                <TableHeaderCell minWidth={"300px"}>Title</TableHeaderCell>
                <TableHeaderCell minWidth={"100px"}>Year</TableHeaderCell>
                <TableHeaderCell minWidth={"100px"}>Revenue</TableHeaderCell>
              </TableHeaderRow>
            }
            onRowClick={handleRowClick}
          >
            {filteredData?.map((movie) => {
              return (
                <TableRow key={movie.id} interactive data-id={movie.id}>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.year}</TableCell>
                  <TableCell>
                    {revenueFormatter.format(movie.revenue)}
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </BusyIndicator>
      </FlexBox>
    </div>
  );
};
