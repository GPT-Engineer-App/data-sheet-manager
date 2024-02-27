import React, { useState, useEffect } from "react";
import { VStack, HStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import { FaPlus, FaTimes } from "react-icons/fa";

const Index = () => {
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);

  const addTable = () => {
    const newTable = {
      columns: 3,
      rows: 3,
      data: {},
    };
    setTables([...tables, newTable]);
  };

  const addColumn = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].columns += 1;
    setTables(updatedTables);
  };

  const addRow = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows += 1;
    setTables(updatedTables);
  };

  const updateCell = (tableIndex, rowIndex, columnIndex, value) => {
    const updatedTables = [...tables];
    const cellKey = `${rowIndex}-${columnIndex}`;
    updatedTables[tableIndex].data[cellKey] = value;
    setTables(updatedTables);
  };

  const calculateCellValue = (value) => {
    if (value.startsWith("=")) {
      try {
        const expression = value.slice(1);
        return eval(expression); // This is not safe for real applications
      } catch (error) {
        return "Error";
      }
    }
    return value;
  };

  const renderTable = (table, tableIndex) => {
    const rows = [];
    for (let rowIndex = 0; rowIndex < table.rows; rowIndex++) {
      const cells = [];
      for (let columnIndex = 0; columnIndex < table.columns; columnIndex++) {
        const cellKey = `${rowIndex}-${columnIndex}`;
        cells.push(
          <Td key={cellKey}>
            <Input value={calculateCellValue(table.data[cellKey] || "")} onChange={(e) => updateCell(tableIndex, rowIndex, columnIndex, e.target.value)} placeholder={`${String.fromCharCode(65 + columnIndex)}${rowIndex + 1}`} />
          </Td>,
        );
      }
      rows.push(<Tr key={rowIndex}>{cells}</Tr>);
    }

    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            {Array.from({ length: table.columns }).map((_, index) => (
              <Th key={index}>{String.fromCharCode(65 + index)}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    );
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addTable}>
          Add Table
        </Button>
        {currentTable !== null && (
          <>
            <Button leftIcon={<FaPlus />} colorScheme="green" onClick={() => addRow(currentTable)}>
              Add Row
            </Button>
            <Button leftIcon={<FaPlus />} colorScheme="green" onClick={() => addColumn(currentTable)}>
              Add Column
            </Button>
            <Button leftIcon={<FaTimes />} colorScheme="red" onClick={() => setCurrentTable(null)}>
              Close Table
            </Button>
          </>
        )}
      </HStack>
      {tables.map((table, index) => (
        <VStack key={index} spacing={4} align="stretch">
          {renderTable(table, index)}
        </VStack>
      ))}
    </VStack>
  );
};

export default Index;
