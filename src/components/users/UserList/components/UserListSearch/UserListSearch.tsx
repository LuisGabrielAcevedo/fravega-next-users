import React, { useEffect, useState } from "react";
import style from "./UserListSearch.module.css";
import { Box, Position } from "@/lib/components";
import Image from "next/image";
import searchLine from "@/assets/icons/search-lg-line.svg";
import { useDebounce } from "@/hooks/useDebounce";

export const UserListSearch: React.FC<{
  onSearch: (val: string) => void;
  defaultValue: string;
}> = ({ defaultValue, onSearch }) => {
  const [value, setValue] = useState("");

  const debouncedSearch = useDebounce((val: string) => {
    onSearch(val);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Box
      isRelative
      testId='user-list-search'
      className={style.userListSearchContainer}
    >
      <input
        value={value}
        onChange={handleChange}
        className={style.userListSearch}
        placeholder='Buscar usuarios ...'
      />
      <Position position='absolute' top={8} right={8}>
        <Image src={searchLine} alt='search' />
      </Position>
    </Box>
  );
};
