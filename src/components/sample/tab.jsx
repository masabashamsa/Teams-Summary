import React, {useState} from 'react';
import { Tab, TabList, TabPanels, TabPanel } from '@fluentui/react-components';
import { Welcome } from './Welcome';

const AppTabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <TabList selectedIndex={selectedTab} onSelectedIndexChange={(_, index) => setSelectedTab(index)}>
                <Tab>Upcoming Meetings</Tab>
                <Tab>Other Tab</Tab>
                
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Welcome />
                </TabPanel>
            </TabPanels>
        </div>
    );
};

export default AppTabs;