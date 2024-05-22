// src/components/Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const Calendar = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Evento 1', start: '2024-05-20T10:00:00', end: '2024-05-21T12:00:00' },
    { id: '2', title: 'Evento 2', start: '2024-05-21T14:00:00', end: '2024-05-21T15:00:00' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEventInfo, setModalEventInfo] = useState(null);
  const [form] = Form.useForm();

  const handleDateSelect = (selectInfo) => {
    setModalEventInfo(selectInfo);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const { title, startDate, endDate, startTime, endTime } = values;
      const start = moment(startDate).set({
        hour: startTime.hour(),
        minute: startTime.minute(),
      });
      const end = moment(endDate).set({
        hour: endTime.hour(),
        minute: endTime.minute(),
      });

      const newEvent = {
        id: String(events.length + 1),
        title,
        start: start.toISOString(),
        end: end.toISOString(),
      };

      setEvents([...events, newEvent]);
      setIsModalOpen(false);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      setEvents(events.filter(event => event.id !== clickInfo.event.id));
    }
  };

  const calendarStyle = {
    width: "100%",
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventClick={handleEventClick}
        contentHeight="auto"
        style={calendarStyle}
      />
      <Modal
        title="Create Event"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="eventForm">
          <Form.Item name="title" label="Event Title" rules={[{ required: true, message: 'Please input the title of event!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please select the start date!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="startTime" label="Start Time" rules={[{ required: true, message: 'Please select the start time!' }]}>
            <TimePicker />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: 'Please select the end date!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="endTime" label="End Time" rules={[{ required: true, message: 'Please select the end time!' }]}>
            <TimePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Calendar;
