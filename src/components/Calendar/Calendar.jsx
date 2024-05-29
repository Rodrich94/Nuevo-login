import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es-us';
import { Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import './Calendar.css'; 

const Calendar = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Evento 1', start: '2024-05-20T10:00:00', end: '2024-05-21T23:59:59' },
    { id: '2', title: 'Evento 2', start: '2024-05-21T14:00:00', end: '2024-05-21T15:00:00' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEventInfo, setModalEventInfo] = useState(null);
  const [form] = Form.useForm();

  const handleDateSelect = (selectInfo) => {
    setModalEventInfo(selectInfo);
    setIsModalOpen(true);
    form.setFieldsValue({
      startDate: moment(selectInfo.startStr)
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newEvent = {
        id: String(events.length + 1),
        title: values.title,
        start: values.startDate.format(),
        end: values.endDate.endOf('day').format() // Set end date to the end of the selected day
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
    if (window.confirm(`¿Estás seguro de que deseas eliminar el evento? '${clickInfo.event.title}'`)) {
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
        eventColor='#87b867'
        eventBorderColor='#F4DFB9'
        locale={esLocale}
      />
      <Modal
        title="Crear nuevo evento"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="eventForm">
          <Form.Item name="title" label="Titulo del evento" rules={[{ required: true, message: 'Por favor, introduce el título del evento.' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="startDate" label="Inicio" rules={[{ required: true, message: 'Por favor, seleccione el dia de inicio' }]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="endDate" label="Fin" rules={[{ required: true, message: 'Por favor, seleccione el dia de finalizacion' }]}>
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Calendar;
