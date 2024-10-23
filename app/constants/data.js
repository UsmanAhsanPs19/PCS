import EntryForLunchIcon from "../../assets/EntryForLunchIcon"
import EventIcon from "../../assets/EventIcon"
import GetzIcon from "../../assets/GetzIcon"
import HitonIcon from "../../assets/HitonIcon"
import ImageIcon from "../../assets/ImageIcon"
import InfoIcon from "../../assets/InfoIcon"
import LekSellIcon from "../../assets/LeksellIcon"
import MarkExitIcon from "../../assets/MarkExitIcon"
import MedicalFileIcon from "../../assets/MedicalFileIcon"
import NurseIcon from "../../assets/NurseIcon"
import PrintEventCardIcon from "../../assets/PrintEventCardIcon"
import QuizIcon from "../../assets/QuizIcon"
import RegisterEventIcon from "../../assets/RegisterEventIcon"
import RegistrationListIcon from "../../assets/RegistrationListIcon"
import SathiSponser from "../../assets/SathiSponer"
import ScheduleIcon from "../../assets/ScheduleIcon"
import SouvenirIcon from "../../assets/SouvenirIcon"
import SPBigIcon from "../../assets/SpBigIcon"
import UserCircleIcon from "../../assets/UserCircle"
import UserIcon from "../../assets/UserIcon"


export const pcs_portal_data = {
    firstData: [{
        text: "Modify Your Personal Account",
        icon: <UserIcon />,
        key: "modify_profile",
        screenName: "UpdateProfile",
    },
    {
        text: "Clinical Case",
        key: "clinical_case",
        link: "web-clinical-case-submission/",
        icon: <MedicalFileIcon />
    },
    {
        text: "Scientific Abstract",
        key: "abstract_submission",
        link: "web-abstract-submission/",
        icon: <MedicalFileIcon />
    }],
    secondData: [{
        text: "Submit an Image",
        key: "image_submission",
        // isEditable: true,
        link: "web-image-submission/",
        icon: <ImageIcon />
    },
    {
        text: "Nursing Professional Clinical Case or Abstract",
        icon: <NurseIcon />,
        key: "",
    },
    {
        text: "Late-Breaking Trial",
        icon: <MedicalFileIcon />,
        key: "late_breaking_trial",
        link: "web-late-breaking-trial-submission/",
    }]
}

export const pcs_portal_register_data = [
    {
        text: "Modify Your Personal Account",
        icon: <UserIcon width={55} height={56} />,
        screenName: "UpdateProfile",
        isVisible: true,
        key: "modify_profile",
    },
    {
        text: "Clinical Case",
        isEditable: true,
        key: "clinical_case",
        link: "web-clinical-case-submission/",
        icon: <MedicalFileIcon width={55} height={56} />,
        isVisible: true
    },
    {
        text: "Scientific Abstract",
        icon: <MedicalFileIcon width={55} height={56} />,
        isVisible: true,
        link: "web-abstract-submission/",
        key: "abstract_submission",
    },
    {
        text: "Late-Breaking Trial",
        icon: <MedicalFileIcon width={55} height={56} />,
        isVisible: true,
        link: "web-late-breaking-trial-submission/",
        key: "late_breaking_trial",
    },
    {
        text: "Allied Professional Clinical Case or Abstract",
        icon: <MedicalFileIcon width={55} height={56} />,
        isVisible: true,
        key: "",
    },
    {
        text: "Innovation for PCS Innovators Day",
        icon: <MedicalFileIcon width={55} height={56} />,
        key: "innovation_submission",
        isVisible: true,
        link: "web-innovation-submission/"

    },
    {
        text: "Submit an Image",
        isEditable: true,
        link: "web-image-submission/",
        key: "image_submission",
        icon: <ImageIcon width={55} height={55} />,
        isVisible: true
    },
    {
        text: "Nursing Professional Clinical Case or Abstract",
        icon: <NurseIcon width={55} height={56} />,
        isVisible: true,
        key: ""
    },
    {
        text: "Register For Event",
        icon: <RegisterEventIcon width={55} height={56} />,
        screenName: "RegisterForConference",
        isVisible: false,
        link: "",
        key: "register_for_event"
    },
];


export const pcs_later_part = [
    {
        text: "Other Person Registration",
        icon: <RegisterEventIcon width={55} height={56} />,
        screenName: "RegisterForConference",
        isVisible: false,
        isAfter: true,
    },
    {
        text: "Registration Lists for Event",
        icon: <RegistrationListIcon width={55} height={56} />,
        screenName: "RegistrantsList",
        isVisible: true,
        isAfter: true,
    },
]

export const entry_app_data = [
    {
        text: "Mark Entry",
        icon: <RegisterEventIcon width={55} height={56} />,
        screenName: "EntryScanner",
        isVisible: true,
    },
    {
        text: "Mark Exit",
        icon: <MarkExitIcon width={40} height={40} />,
        screenName: "EntryScanner",
        isVisible: true,
    },
    {
        text: "Mark Entry for Lunch",
        icon: <EntryForLunchIcon width={40} height={40} />,
        screenName: "EntryScanner",
        isVisible: true,
    },
    {
        text: "Check Entry",
        icon: <RegistrationListIcon width={55} height={56} />,
        screenName: "EntryScanner",
        isVisible: true,
    },
]

export const pcs_data_souvenier = [
    {
        text: "Souvinir",
        icon: <SouvenirIcon width={55} height={56} />,
        screenName: "GetSouvinir",
        isVisible: false,
        isAfter: true,
    },
]



export const navigation_section_data = [
    {
        text: "Schedule",
        icon: <ScheduleIcon />,
        screenName: "ScheduleScreen",
    },
    {
        text: "Speakers",
        icon: <UserCircleIcon />,
        screenName: "SpeakersScreen"
    },
    {
        text: "Event Information",
        icon: <EventIcon />,
        screenName: "EventInfo"
    },
    {
        text: "General Information",
        isEditable: true,
        icon: <InfoIcon />,
        screenName: "GeneralInformation"
    },

]

export const navigation_data_after_auth = [
    {
        text: "Quiz",
        isEditable: false,
        icon: <QuizIcon />,
        screenName: "QuizDashboard"
    }
]

export const navigation_all_data = [
    { name: "Schedule", screenName: "ScheduleScreen" },
    { name: "Speakers", screenName: "SpeakersScreen" },
    { name: "Sponsers", screenName: "SponsersScreens" },
    { name: "Audience Poll", screenName: "QuizDashboard" },
    { name: "Event Information", screenName: "EventInfo" },
    { name: "General Information", screenName: "GeneralInformation" },
    // { name: "FAQs", screenName: "" },
    // { name: "Register for Cardiocon 2024", screenName: "RegisterForConference" },
    { name: "Delete Account", screenName: "" }
]

export const speakers_data = [{
    image: require("../../assets/d1.png"),
    name: "Robert F. Spetzler",
    designation: "Emeritus Chair Neurosurgery at Barrow Neurological Institute"
},
{
    image: require("../../assets/d2.png"),
    name: "Andres M. Lozono",
    designation: "MD, PhD, FRCSC, FRSC, FCAHS"
},
{
    image: require("../../assets/d3.png"),
    name: "Micheal T Lawton",
    designation: "President and CEO Professor and Chair."
},
{
    image: require("../../assets/d4.png"),
    name: "Aeron Cohan-Gadol",
    designation: "President and CEO, The Neurosurgical Atlas."
}
]

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

export const TITLE_PICKER = [
    {
        id: "Mr.",
        name: "Mr.",
    },
    {
        id: "Mrs.",
        name: "Mrs.",
    },
    {
        id: "Miss",
        name: "Miss",
    },
    {
        id: "Dr.",
        name: "Dr.",
    },
    {
        id: "Prof.",
        name: "Prof.",
    },
]

export const GENDER_PICKER = [
    {
        id: "Male",
        name: "Male",
    },
    {
        id: "Female",
        name: "Female",
    }
]
