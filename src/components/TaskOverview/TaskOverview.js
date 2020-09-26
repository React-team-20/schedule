import {
  AlignLeftOutlined,
  CopyOutlined,
  EnvironmentOutlined,
  FileImageOutlined,
  FlagOutlined,
  FolderViewOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Avatar, Button, List, Menu, Modal, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hideTaskOverview, showFormEditEvent} from '../../actions';
import Map from '../Map';
import FeedbackForm from '../FeedbackForm';
import './task-overview.css';

const {SubMenu} = Menu;

const TaskOverview = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const {
    isShowTaskOverview,
    currentEvent,
    userRole,
    isNeedUpdate,
    alert,
    isShowPreview,
  } = useSelector(state => state.app);
  const [event, setEvent] = useState(null);

  const showFormEdit = () => {
    dispatch(showFormEditEvent(currentEvent));
  };

  useEffect(() => {
    if (isShowTaskOverview || (isNeedUpdate && !alert)) {
      setEvent(events.find(i => i.id === currentEvent));
    }
    // eslint-disable-next-line
  }, [isShowTaskOverview, isNeedUpdate, alert]);

  const handleOk = () => {
    dispatch(hideTaskOverview());
    setEvent(null);
  };

  const checkImage = e => {
    e.target.src = 'https://media.moddb.com/images/members/4/3158/3157353/image_error_full.png';
  };

  return (
    <Modal
      title="Event information"
      visible={isShowTaskOverview}
      onOk={handleOk}
      onCancel={handleOk}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          {userRole === 'mentor' && !isShowPreview ? (
            <Tooltip title="Edit event" placement="top">
              <Button onClick={showFormEdit} style={{marginRight: 8}}>
                Edit
              </Button>
            </Tooltip>
          ) : (
            ''
          )}
          <Button type="primary" onClick={handleOk}>
            Ok
          </Button>
        </div>
      }
    >
      {event && (
        <List className="overview">
          <h2 className="topic">{event.topic}</h2>
          {event.organizer && (
            <List.Item>
              <List.Item.Meta
                avatar={<UserOutlined />}
                title="Organizer:"
                description={
                  <a href={event.organizer.htmlUrl} target="_blank" rel="noopener noreferrer">
                    <Avatar size="small" src={event.organizer.avatar} />
                    {event.organizer.name}
                  </a>
                }
              />
            </List.Item>
          )}
          <List.Item>
            <List.Item.Meta avatar={<FlagOutlined />} title="Type:" description={event.type} />
          </List.Item>
          {event.description && (
            <List.Item>
              <List.Item.Meta
                avatar={<AlignLeftOutlined />}
                title="Description:"
                description={event.description}
              />
            </List.Item>
          )}
          {event.taskObj.screen && (
            <List.Item>
              <List.Item.Meta
                avatar={<FileImageOutlined />}
                title="Photo:"
                description={
                  <img onError={checkImage} src={event.taskObj.screen} alt="скриншот задания" />
                }
              />
            </List.Item>
          )}
          {event.taskObj.demoUrl && (
            <List.Item>
              <List.Item.Meta
                avatar={<FolderViewOutlined />}
                title="Demo:"
                description={
                  <a href={event.taskObj.demoUrl} target="_blank" rel="noopener noreferrer">
                    Deploy
                  </a>
                }
              />
            </List.Item>
          )}
          {event.place && (
            <List.Item>
              <Menu className="dropdown-menu" mode="inline">
                <SubMenu title="Place" icon={<EnvironmentOutlined />}>
                  <p className="location">{event.place.address}</p>
                  <Map lng={event.place.geocode.lng} lat={event.place.geocode.lat} />
                </SubMenu>
              </Menu>
            </List.Item>
          )}
          {event.taskObj.materials.length !== 0 && (
            <List.Item>
              <Menu className="dropdown-menu" mode="inline">
                <SubMenu title="Materials" icon={<CopyOutlined />}>
                  {event.taskObj.materials.map((item, i) => {
                    return (
                      <Menu.Item key={i}>
                        <a href={item.materialLink} target="_blank" rel="noopener noreferrer">
                          {item.materialName}
                        </a>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              </Menu>
            </List.Item>
          )}
          {event.feedback && (
            <List.Item>
              <FeedbackForm id={event.id} />
            </List.Item>
          )}
        </List>
      )}
    </Modal>
  );
};

export default TaskOverview;
