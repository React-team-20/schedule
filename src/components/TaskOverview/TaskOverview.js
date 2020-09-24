import {
  AlignLeftOutlined,
  CopyOutlined,
  EnvironmentOutlined,
  FileImageOutlined,
  FlagOutlined,
  FolderViewOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Avatar, Button, Form, Input, List, Menu, Modal, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {geocodePlace, hideTaskOverview, showFormEditEvent} from '../../actions';
import Map from '../Map';
import './task-overview.css';

const {SubMenu} = Menu;

const TaskOverview = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const {isShowTaskOverview, currentEvent, userRole} = useSelector(state => state.app);
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [form] = Form.useForm();

  const showFormEdit = () => {
    dispatch(showFormEditEvent(currentEvent));
  };

  useEffect(() => {
    if (isShowTaskOverview && currentEvent) {
      setEvent(events.find(i => i.id === currentEvent));
    }
    // eslint-disable-next-line
  }, [isShowTaskOverview]);

  const handleOk = () => {
    dispatch(hideTaskOverview());
    setEvent(null);
  };

  const handleType = e => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    let feedbacksArray;
    if (localStorage.getItem('feedbacks')) {
      feedbacksArray = JSON.parse(localStorage.getItem('feedbacks'));
    } else {
      feedbacksArray = [];
    }
    const feedbackId = new Date().getTime();
    const newFeedback = {feedbackId, feedback};
    feedbacksArray.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacksArray));
    setFeedback('');
  };

  const showPosition = () => {
    dispatch(geocodePlace('Минск, Платонова 39'));
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
          {userRole === 'mentor' ? (
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
                  <a href={event.taskObj.screen} title="Открыть в новой вкладке" target="_blank">
                    <img src={event.taskObj.screen} />
                  </a>
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
            <List.Item onClick={showPosition}>
              <Menu className="dropdown-menu" mode="inline">
                <SubMenu title="Place" icon={<EnvironmentOutlined />}>
                  <p className="location">Test location</p>
                  {event.place}
                  <Map />
                </SubMenu>
              </Menu>
            </List.Item>
          )}
          {event.taskObj.materials && (
            <List.Item>
              <Menu className="dropdown-menu" mode="inline">
                <SubMenu title="Materials" icon={<CopyOutlined />}>
                  {event.taskObj.materials.map(item => {
                    return (
                      <Menu.Item key={event.id}>
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
              <Form layout="vertical" id="feedback-form" form={form} onFinish={handleSubmit}>
                <Form.Item>
                  <List.Item>
                    <List.Item.Meta avatar={<MessageOutlined />} title="Feedback:" />
                  </List.Item>
                  <Input.TextArea
                    rows={5}
                    placeholder="Please leave your feedback"
                    onChange={handleType}
                    value={feedback}
                  />
                </Form.Item>
                <Button type="primary" form="feedback-form" htmlType="submit">
                  Send feedback
                </Button>
              </Form>
            </List.Item>
          )}
        </List>
      )}
    </Modal>
  );
};

export default TaskOverview;
