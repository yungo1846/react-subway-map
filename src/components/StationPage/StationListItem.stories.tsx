import StationListItem from './StationListItem';

export default {
  title: 'StationPage/StationListItem',
  component: StationListItem,
};

const Template = () => (
  <StationListItem
    station={{ name: '지하철역', id: 1, lines: [{ id: 1, color: '#123456', name: '1호선' }] }}
    deleteStation={() => {}}
  />
);
export const Default = Template.bind({});
