import EventIcon from "../../assets/EventIcon"
import ImageIcon from "../../assets/ImageIcon"
import InfoIcon from "../../assets/InfoIcon"
import MedicalFileIcon from "../../assets/MedicalFileIcon"
import NurseIcon from "../../assets/NurseIcon"
import ScheduleIcon from "../../assets/ScheduleIcon"
import UserCircleIcon from "../../assets/UserCircle"
import UserIcon from "../../assets/UserIcon"

export const pcs_portal_data = {
    firstData: [{
        text: "Modify Your Personal Account",
        icon: <UserIcon />
    },
    {
        text: "Clinical Case",
        isEditable: true,
        icon: <MedicalFileIcon />
    },
    {
        text: "Scientific Abstract",
        icon: <MedicalFileIcon />
    }],
    secondData: [{
        text: "Submit an Image",
        isEditable: true,
        icon: <ImageIcon />
    },
    {
        text: "Nursing Professional Clinical Case or Abstract",
        icon: <NurseIcon />
    },
    {
        text: "Late-Breaking Trial",
        icon: <MedicalFileIcon />
    }]
}

export const navigation_section_data = {
    firstData: [{
        text: "Schedule",
        icon: <ScheduleIcon />
    },
    {
        text: "Speakers",
        icon: <UserCircleIcon />
    }],
    secondData: [{
        text: "Event Information",
        icon: <EventIcon />
    },
    {
        text: "General Information",
        isEditable: true,
        icon: <InfoIcon />
    },
    ],
}

export const speakers_data = {
    firstData: [{
        image: require("../../assets/d1.png"),
        name: "Robert F. Spetzler",
        designation: "Emeritus Chair Neurosurgery at Barrow Neurological Institute"
    },
    {
        image: require("../../assets/d2.png"),
        name: "Andres M. Lozono",
        designation: "MD, PhD, FRCSC, FRSC, FCAHS"
    }],
    secondData: [{
        image: require("../../assets/d3.png"),
        name: "Micheal T Lawton",
        designation: "President and CEO Professor and Chair."
    },
    {
        image: require("../../assets/d4.png"),
        name: "Aeron Cohan-Gadol",
        designation: "President and CEO, The Neurosurgical Atlas."
    }]
}