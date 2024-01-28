// 'use client';

// import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
// import Link from 'next/link';
// import React, { useEffect } from 'react';
// import { BsArrowLeft } from 'react-icons/bs';

// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Footer from '@/components/footer/Footer';
// import PublicNavBar from '@/components/navbar/PublicNavBar';
// import { APP_CONSTANTS } from '@/constants/appConstants';
// import { COLORS } from '@/constants/colors';
// import { ROUTES } from '@/constants/pageRoutes';

// const contentStyle: React.CSSProperties = {
//   margin: '50px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// };

// const NotFound = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);
//   return (
//     <Box width='100%' position='relative'>
//       <PublicNavBar color={COLORS.u_black} bg={COLORS.white} />
//       <Flex
//         data-aos='zoom-in'
//         width='100%'
//         height={['70vh', '70vh', '80vh']}
//         position='relative'
//         top={['5rem']}
//         direction='column'
//         align='center'
//         justify='center'
//         px={['1rem', '1rem', '9%']}
//       >
//         <Image src='/images/contactImg.png' width='14rem' height='16rem' alt='Not found' />
//         <Text fontSize={['1.2rem', '1.2rem', '2rem']} fontWeight='semibold' textAlign='center'>
//           Sorry, the page you are looking for is not here
//         </Text>
//       </Flex>
//       <Flex width='100%' justify='center' mb='2rem'>
//         <Link href={ROUTES.home}>
//           <Button width='14rem' bg={COLORS.secondary} leftIcon={<BsArrowLeft size={APP_CONSTANTS.iconSize} />}>
//             Return Home
//           </Button>
//         </Link>
//       </Flex>

//       <Footer />
//     </Box>
//   );
// };

// export default NotFound;

const NotFound = () => {
  return (
    <div>
      <p>Not Found</p>
    </div>
  );
};

export default NotFound;
