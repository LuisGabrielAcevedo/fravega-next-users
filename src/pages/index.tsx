import { Loading, MainLayout, UserList } from "@/components";
import { Box } from "@/lib/components";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box stretch backgroundColor='neutral50'>
      <MainLayout
        title='Frávega'
        description='Frávega, lista de usuarios'
        subtitle='Usuarios'
      >
        <Loading />
        <Box paddingY='xl' paddingX='md'>
          <UserList />
        </Box>
      </MainLayout>
    </Box>
  );
};

export default Home;
