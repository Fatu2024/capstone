import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // for the monthly view
import timeGridPlugin from '@fullcalendar/timegrid'; // for the weekly and daily views
import interactionPlugin from '@fullcalendar/interaction'; // for date clicking & selection

const Calendar = () => {
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
            />
        </div>
    );
};

export default Calendar;
