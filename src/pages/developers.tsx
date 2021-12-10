import { Box, Container, Stack, VStack, StackDivider, Flex, ButtonGroup, Button, Menu, 
  MenuButton, MenuItem, MenuList, Skeleton, Alert, AlertIcon, AlertDescription, 
  AlertTitle, Heading, Text, HStack, Image } from '@chakra-ui/react'
import { StarIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import {parseDeveloperResult} from "../libs/parse-data"
import { Developer, PopularRepository } from '../libs/data'

const LoadingBox = () => (
  <Box px={5} py={3}>
    <Flex direction="row" justifyContent="space-between" mb={3}>
      <Skeleton height='26px' w='30%' />
      <Skeleton height='26px' w='10%' />
    </Flex>
    <Skeleton height='20px' w='80%' mb={3} />
    <Flex direction="row" justifyContent="space-between">
      <Skeleton height='20px' w='40%' />
      <Skeleton height='20px' w='10%' />
    </Flex>
  </Box>
  )

const ArticleBox = (detail: Developer, idx: number) => (
  <Box px={5} py={3}>
    <Flex direction="row" alignContent="center">
      <Text width='30px' textAlign="left">{idx}</Text>
      <HStack spacing={3} width={'40%'}>
        <Image src={detail.avatar} alt={detail.username} width='48px' borderRadius='48px' />
        <Box>
          <Heading as='h3' fontSize={24} color={'blue.400'} fontWeight={'normal'}>
            <a href={detail.url} target="_blank">{detail.name}</a>
          </Heading>
          <Text>{detail.username}</Text>
        </Box>
      </HStack>
      <VStack spacing={2} alignItems='flex-start' width='40%'>
        <HStack spacing={1} fontSize='12px' >
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill='#bc4c00'>
            <path fill-rule="evenodd" d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.788 2.788 0 01-1.436-.874A3.21 3.21 0 003 10c0 2.53 2.164 4.5 4.998 4.5zM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.54.487-2.04-.832-.173-.454-.659-.762-1.035-.454C2.036 7.44 1.5 8.702 1.5 10c0 3.512 2.998 6 6.498 6s6.5-2.5 6.5-6c0-2.137-1.128-3.26-2.312-4.438-1.19-1.184-2.436-2.425-2.653-4.81z"></path>
          </svg>
          <span>POPULAR REPO</span>
        </HStack>
        <HStack spacing={1}>
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill='#fff'>
            <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
          </svg>
          <a href={detail.popularRepository.url}><Text color='blue.400'>{detail.popularRepository.repositoryName}</Text></a>
        </HStack>
        <Text fontSize='12px'>{detail.popularRepository.description}</Text>
      </VStack>
      <HStack alignItems={'flex-start'} justifyContent={'flex-end'} spacing={3} width={'20%'}>
        <Button size={'sm'}>Follow</Button>
      </HStack>
    </Flex>
  </Box>
)

function Developers() {
  const { isLoading, isError, data, error } = useQuery('developers', async () => {
    const res = await fetch('/developers.json')
    return parseDeveloperResult(await res.json())
  })
  console.log({ isLoading, isError, data, error })
  return (
    <Box py='2rem'>
      <Container maxW='container.lg'>
        <Box border='1px' borderRadius='5px' overflow='hidden'>
          <Flex justifyContent="space-between" alignItems="center" fontSize="sm" p="5" backgroundColor='gray.900' borderBottom='1px'>
            <ButtonGroup isAttached variant="outline">
              <Button fontSize="sm"><Link to="/">Repositories</Link></Button>
              <Button fontSize="sm" isActive _active={{background: 'blue.400'}}>
                Developers
              </Button>
            </ButtonGroup>
            <Stack direction="row">
              <Box padding="0 0.5rem">
                Language:
                <Menu>
                  <MenuButton pl="1">
                    Any  <TriangleDownIcon w="3" h="3" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Item1</MenuItem>
                    <MenuItem>Item2</MenuItem>
                    <MenuItem>Item3</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box padding="0 0.5rem">
                Date range:
                <Menu>
                  <MenuButton pl="1">
                    Today <TriangleDownIcon w="3" h="3" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>This week</MenuItem>
                    <MenuItem>This Month</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </Flex>
          {isLoading && (
            <VStack spacing={0} divider={<StackDivider />} align="left">
              {[...Array(5)].map((v, i) => <LoadingBox key={`lb${i}`} />)}
            </VStack>
          )}
          {(!isLoading && isError) && (
            <Alert status='error' textAlign={"center"}>
              <Box flex='1'>
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription display='block'>
                  Oops, there was an error while fetching the data.
                </AlertDescription>
              </Box>
            </Alert>
          )}
          {(!isLoading && !isError) && (
            <VStack spacing={0} divider={<StackDivider />} align="left">
              {data?.map((detail, idx) => ArticleBox(detail, idx + 1))}
            </VStack>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Developers