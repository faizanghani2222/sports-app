import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import CreateEvent from '../Components/CreateEvent';
import MyEvent from '../Components/MyEvents';
import RequestedEvent from '../Components/RequestedEvents';

function Dashboard(props) {
    return (
        <Box>
                <Tabs isFitted variant='enclosed'>
                <TabList>
                    <Tab> <Heading fontSize="21px" fontWeight="500">Create Event</Heading></Tab>
                    <Tab> <Heading fontSize="21px" fontWeight="500">Requested Events Status</Heading></Tab>
                    <Tab><Heading fontSize="21px" fontWeight="500">My Events</Heading></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>

                        <CreateEvent/>

                    </TabPanel>
                    <TabPanel>

                        <RequestedEvent/>

                    </TabPanel>
                    <TabPanel>

                        <MyEvent/>

                    </TabPanel>
                </TabPanels>
                </Tabs>
        </Box>
    );
}

export default Dashboard;