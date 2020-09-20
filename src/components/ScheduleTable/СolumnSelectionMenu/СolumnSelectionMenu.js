import {CaretDownOutlined} from '@ant-design/icons';
import {Button, Checkbox, Popover, Tooltip} from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTableColumns} from '../../../actions';
import './column-selection-menu.css';

const СolumnSelectionMenu = () => {
  const dispatch = useDispatch();
  const {tableColumns} = useSelector(state => state.app);

  const onChange = title => {
    const newColumns = [...tableColumns];
    const col = newColumns.find(i => i.title === title);
    col.checked = !col.checked;
    localStorage.setItem('tableColumns', JSON.stringify(newColumns));
    dispatch(setTableColumns(newColumns));
  };

  const content = (
    <div className="checkbox-columns-container">
      {tableColumns.map(i => (
        <Checkbox
          key={i.title}
          onChange={() => onChange(i.title)}
          disabled={i.disabled}
          checked={i.checked}
        >
          {i.title}
        </Checkbox>
      ))}
    </div>
  );

  return (
    <Popover placement="bottom" title="Сolumn selection" content={content} trigger="click">
      <span style={{marginRight: '5px'}}>Action</span>
      <Tooltip title="Сolumn selection">
        <Button style={{border: 0, padding: 0, width: 'auto'}} icon={<CaretDownOutlined />} />
      </Tooltip>
    </Popover>
  );
};

export default СolumnSelectionMenu;
