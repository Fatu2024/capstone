import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [editableEvent, setEditableEvent] = useState(null);

    const handleEventContent = (eventInfo) => {
        return {
            html: `
                <div class="fc-event-title">
                    <span>${eventInfo.event.title}</span>
                </div>
            `
        };
    };

    const handleEventClick = (clickInfo) => {
        //ask user to edit the title
        let newTitle = prompt('Edit event:', clickInfo.event.title);

        //toggle completion state
        let isCompleted = clickInfo.event.extendedProps.isCompleted;
        clickInfo.event.setExtendedProp('isCompleted', !isCompleted);

        //update the event title if a new title was entered
        if (newTitle !== null) {
            clickInfo.event.setProp('title', newTitle);
        }

        //call this update to render
        clickInfo.event.setProp('classNames', ['completed']);
    };

    //function to create a unique event ID
    const createEventId = () => {
        return String(Math.floor(Math.random() * 1000000));
    };

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar;

        //clear date selection
        calendarApi.unselect();

        if (title) {
            let newEvent = {
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            };
            setEvents([...events, newEvent]);
        }
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={events}
                eventContent={handleEventContent}
                eventClick={handleEventClick}
                select={handleDateSelect} 
            />
        </div>
    );
};

export default Calendar;
