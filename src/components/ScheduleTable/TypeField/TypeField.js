import {Tag} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import {setTagStyle} from '../../../utils';
import './type-field.css';

const TypeField = ({type}) => {
  const eventsTypes = useSelector(state => state.styles);
  const {color, background} = setTagStyle(type, eventsTypes);
  return (
    <Tag className="list-item-tag" style={{border: 0, color: color, background: background}}>
      {type
        .toUpperCase()
        .split('')
        .map(i => (i === '-' ? ' ' : i))
        .join('')}
    </Tag>
  );
};

export default TypeField;
