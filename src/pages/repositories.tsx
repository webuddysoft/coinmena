import { Box, Container, Stack, VStack, StackDivider, Flex, ButtonGroup, Button, Menu, 
  MenuButton, MenuItem, MenuList, Skeleton, Alert, AlertIcon, AlertDescription, 
  AlertTitle, Heading, Text, HStack, Image } from '@chakra-ui/react'
import { StarIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import {parseRepositoryResult} from "../libs/parse-data"
import { Repository, Contributer } from '../libs/data'

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

const ArticleBox = (detail: Repository) => (
  <Box px={5} py={3}>
    <Flex direction="row" justifyContent="space-between" alignContent="center">
      <Flex direction="row" w='80%' alignItems={'center'}>
        <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{fill: "#fff"}}>
          <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
        <Heading as='h3' fontSize={24} color={'blue.400'} fontWeight={'normal'} marginLeft={2}><a href={detail.url} target="_blank">{detail.username} / {detail.repositoryName}</a></Heading>
      </Flex>
      <Menu>
        <MenuButton border="1px" borderRadius={3} px={2} alignItems='center'>
          <HStack>
          <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{fill: "#fff"}}>
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          </svg>
          <span>Star</span>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem>Item1</MenuItem>
          <MenuItem>Item2</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
    <Text my={1}>{detail.description}</Text>
    <Flex direction="row" justifyContent="space-between" fontSize={'sm'}>
      <HStack spacing={5}>
        <HStack spacing={1}>
          <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{fill: "#fff"}}>
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          </svg>
          <span>{detail.totalStars}</span>
        </HStack>
        <HStack spacing={1}>
          <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{fill: "#FFF"}}>
            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
          </svg>
          <span>{detail.totalStars}</span>
        </HStack>
        <HStack spacing={1}>
          <Text>Built by</Text>
          {detail.builtBy.map((b : Contributer) => <a href={b.url}><Image src={b.avatar} alt={b.username} width='20px' borderRadius='100%' /></a>)}
        </HStack>
      </HStack>
      <HStack spacing={1}>
        <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" style={{fill: "#fff"}}>
          <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
        <span>{detail.starsSince}</span>
        <span>stars toady</span>
      </HStack>
    </Flex>
  </Box>
)


function Repositories() {
  const { isLoading, isError, data, error } = useQuery('repositories', async () => {
    const res = await fetch('/repositories.json')
    return parseRepositoryResult(await res.json())
  })
  return (
    <Box py='2rem'>
      <Container maxW='container.lg'>
        <Box border='1px' borderRadius='5px' overflow='hidden'>
          <Flex justifyContent="space-between" alignItems="center" fontSize="sm" p="5" backgroundColor='gray.900' borderBottom='1px'>
            <ButtonGroup isAttached variant="outline">
              <Button fontSize="sm" isActive _active={{background: 'blue.400'}}>Repositories</Button>
              <Button fontSize="sm">
                <Link to="/developers">Developers</Link>
              </Button>
            </ButtonGroup>
            <Stack direction="row">
              <Box padding="0 0.5rem">
                Spoken Language:
                <Menu>
                  <MenuButton pl="1">
                    Any <TriangleDownIcon w="3" h="3" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Item1</MenuItem>
                    <MenuItem>Item2</MenuItem>
                    <MenuItem>Item3</MenuItem>
                  </MenuList>
                </Menu>
                </Box>
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
              {data?.map(detail => ArticleBox(detail))}
            </VStack>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Repositories