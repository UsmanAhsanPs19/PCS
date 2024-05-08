import EventIcon from "../../assets/EventIcon"
import GetzIcon from "../../assets/GetzIcon"
import HitonIcon from "../../assets/HitonIcon"
import ImageIcon from "../../assets/ImageIcon"
import InfoIcon from "../../assets/InfoIcon"
import LekSellIcon from "../../assets/LeksellIcon"
import MedicalFileIcon from "../../assets/MedicalFileIcon"
import NurseIcon from "../../assets/NurseIcon"
import PrintEventCardIcon from "../../assets/PrintEventCardIcon"
import RegisterEventIcon from "../../assets/RegisterEventIcon"
import SathiSponser from "../../assets/SathiSponer"
import ScheduleIcon from "../../assets/ScheduleIcon"
import SPBigIcon from "../../assets/SpBigIcon"
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

export const pcs_portal_all_data = [
    {
        text: "Modify Your Personal Account",
        icon: <UserIcon width={55} height={56} />
    },
    {
        text: "Clinical Case",
        isEditable: true,
        icon: <MedicalFileIcon width={55} height={56} />
    },
    {
        text: "Scientific Abstract",
        icon: <MedicalFileIcon width={55} height={56} />
    },
    {
        text: "Late-Breaking Trial",
        icon: <MedicalFileIcon width={55} height={56} />
    },
    {
        text: "Allied Professional Clinical Case or Abstract",
        icon: <MedicalFileIcon width={55} height={56} />
    },
    {
        text: "Innovation for Solvurs Innovators Day",
        icon: <MedicalFileIcon width={55} height={56} />
    },
    {
        text: "Submit an Image",
        isEditable: true,
        icon: <ImageIcon width={55} height={55} />
    },
    {
        text: "Nursing Professional Clinical Case or Abstract",
        icon: <NurseIcon width={55} height={56} />
    },
    {
        text: "Register For Event",
        icon: <RegisterEventIcon width={55} height={56} />
    },
    {
        text: "Print Event Card",
        icon: <PrintEventCardIcon width={55} height={56} />
    },
];

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

export const navigation_all_data = [
    "PCS Portal",
    "Schedule",
    "Scientific Program",
    "Speakers",
    "Sponsers",
    "FAQs",
    "General Information",
    "Register for Cardiocon 2024"
]

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

export const speakers_all_data = [
    {
        image: <SPBigIcon />,
        name: "Robert F. Spetzler",
        designation: "Emeritus Chair Neurosurgery at Barrow Neurological Institute"
    },
    {
        image: <SPBigIcon />,
        name: "Andres M. Lozono",
        designation: "MD, PhD, FRCSC, FRSC, FCAHS"
    },
    {
        image: <SPBigIcon />,
        name: "Micheal T Lawton",
        designation: "President and CEO Professor and Chair."
    },
    {
        image: <SPBigIcon />,
        name: "Aeron Cohan-Gadol",
        designation: "President and CEO, The Neurosurgical Atlas."
    }]

export const sponers_data = [
    <SathiSponser />, <LekSellIcon />, <HitonIcon />, <GetzIcon />, <SathiSponser />, <LekSellIcon />, <HitonIcon />, <GetzIcon />
]

// Big dimesions
export const sponers_data_big = [
    <SathiSponser width={104} height={120} />, <LekSellIcon width={152} height={120} />, <HitonIcon width={120} height={120} />, <GetzIcon width={146} height={66} />, <SathiSponser width={104} height={120} />, <LekSellIcon width={152} height={120} />, <HitonIcon width={120} height={120} />, <GetzIcon width={146} height={66} />
]