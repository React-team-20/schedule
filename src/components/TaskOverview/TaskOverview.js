import {
  Modal,
  Avatar,
  Input,
  Button,
  Form,
  List,
  Menu
} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  UserOutlined,
  AlignLeftOutlined,
  CopyOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  FlagOutlined,
  FileImageOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import Map from '../Map';
import {hideTaskOverview} from '../../actions';
import './task-overview.css';

const { SubMenu } = Menu;

const TaskOverview = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const {isShowTaskOverview, currentEvent} = useSelector(state => state.app);
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [form] = Form.useForm();

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

  const handleCancel = () => {
    dispatch(hideTaskOverview());
    setEvent(null);
  };

  const handleType = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    let feedbacksArray;
    if(localStorage.getItem("feedbacks")) {
      feedbacksArray = JSON.parse(localStorage.getItem("feedbacks"));
    } else {
      feedbacksArray = [];
    }
    const feedbackId = new Date().getTime();
    const newFeedback = {feedbackId, feedback};
    feedbacksArray.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacksArray));
    setFeedback('');
  };

  return (
    <Modal
      title="Event information"
      visible={isShowTaskOverview}
      onOk={handleOk}
      onCancel={handleCancel}
    >
    {event &&
      <List className="overview">
        <h2 className="topic">
          {event.topic}
        </h2>
        <List.Item hidden={!event.organizer}>
          <List.Item.Meta
            avatar={<UserOutlined />}
            title="Organizer:" 
            description = {
            <a href={event.organizer.htmlUrl} target="_blank">
              <Avatar
                size="small"
                src={event.organizer.avatar}
              />
              {event.organizer.name}
            </a>
            }
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<FlagOutlined />}
            title="Type:"
            description={
              event.type
            }
          />
        </List.Item>
        <List.Item hidden={!event.description}>
          <List.Item.Meta
            avatar={<AlignLeftOutlined />}
            title="Description:"
            description={
              event.description
            }
          />
        </List.Item>
        <List.Item hidden={event.taskObj.demoUrl}>
          <List.Item.Meta
            avatar={<FileImageOutlined />}
            title="Photo:"
            description={
              event.taskObj.demoUrl
            }
          />
        </List.Item>
        <List.Item hidden={!event.taskObj.demoUrl}>
          <List.Item.Meta
            avatar={<FolderViewOutlined />}
            title="Demo:"
            description={
              event.taskObj.demoUrl
            }
          />
        </List.Item>
        <List.Item hidden={event.place}>
          <Menu className="dropdown-menu" mode="inline">
            <SubMenu title="Place" icon={<EnvironmentOutlined />}>
              <p className="location">Test location</p>
              {event.place}
              <Map />
            </SubMenu>
          </Menu>
        </List.Item>
        <List.Item hidden={!event.taskObj.materials}>
          <Menu className="dropdown-menu" mode="inline" >
            <SubMenu title="Materials" icon={<CopyOutlined />}>
              {event.taskObj.materials.split('\n').map((item, i) => (<Menu.Item key = {i}>{item}</Menu.Item>))}
            </SubMenu>
          </Menu>
        </List.Item>
        <List.Item hidden={!event.feedback}>
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
      </List>
    }
    </Modal>
  );
};

export default TaskOverview;
