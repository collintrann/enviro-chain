import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'

const Content = () => {
  const tabs = ['Edit Company Profile']

  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: 'translateY(100px)' }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map(tab => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: 'transparent' }}
              _selected={{ color: 'brand.dark', borderColor: 'brand.blue' }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={6}
            >
              <FormControl id="company">
                <FormLabel>Company Name</FormLabel>
                <Input focusBorderColor="brand.blue" type="text" placeholder="Amazon" />
              </FormControl>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Select focusBorderColor="brand.blue" placeholder="Select city">
                  <option value="newyork">New York</option>
                  <option value="california">California</option>
                  <option value="toronto">Toronto</option>
                  <option value="washington" selected>
                    Washington
                  </option>
                  <option value="london">London</option>
                  <option value="netherland">Netherland</option>
                  <option value="poland">Poland</option>
                </Select>
              </FormControl>
              <FormControl id="country">
                <FormLabel>Country</FormLabel>
                <Select focusBorderColor="brand.blue" placeholder="Select country">
                  <option value="america" selected>
                    America
                  </option>
                  <option value="england">England</option>
                  <option value="poland">Poland</option>
                </Select>
              </FormControl>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
        <Button>Update</Button>
      </Box>
    </Box>
  )
}

export default Content
