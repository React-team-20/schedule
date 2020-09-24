
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ExportOutlined} from '@ant-design/icons';
import {Button, Tooltip} from 'antd';
import {exportToGoogle} from '../../../actions';

const ExportToGoogle = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.events);
  const {events} = data;

  const exportData = () => {   
    dispatch(exportToGoogle());
    console.log(events)
    const data = events.slice();

    function CSV(array) {
      // Use first element to choose the keys and the order
      var keys = Object.keys(array[0]);
  
      // Build header
      var result = keys.join("\t") + "\n";
  
      // Add the rows
      array.forEach(function(obj){
          keys.forEach(function(k, ix){
              if (ix) result += "\t";
              result += obj[k];
          });
          result += "\n";
      });
  
        return result;
    }

    const rows = [
      ["name1", "city1", "some other info"],
      ["name2", "city2", "more info"]
    ];

    console.log(CSV(rows))
  };

  return (
    <Tooltip title="export to Google calendar">
      <Button className="button-center-icon button-export" onClick={exportData}>
        <ExportOutlined />
      </Button>
    </Tooltip>  
  );
};

export default ExportToGoogle;