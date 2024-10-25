import { Avatar, Carousel, Rating, Tab, TabPanel, Tabs, TabsBody, TabsHeader, ThemeProvider, Typography } from "@material-tailwind/react";
import { Activity } from "../../interfaces/TripProps/TripProps";
import adventureIcon from '../../assets/activity/adventure.svg';
import cultureIcon from '../../assets/activity/culture.svg';
import relaxationIcon from '../../assets/activity/relaxation.svg';
import sportIcon from '../../assets/activity/sport.svg';
import partyIcon from '../../assets/activity/party-and-bar.svg';

interface PinInfos {
    title: string;
    description: string;
    activities: Activity[];
    owner_firstname: string;
    owner_lastname: string;
    owner_profile_picture: string;
    pin_image: string;
}

interface PinReview {
    user_firstname: string;
    user_lastname: string;
    user_profile_picture: string;
    rating: number;
    comment: string;
    pin_image: string;
}

const carouselTheme = {
    carousel: {
        defaultProps: {
            loop: true,
        },
    },
};

export default function PinDetail() {

    const images = [
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    ];

    // Fake Pin infos data
    const pinInfoData: PinInfos = {
        title: "Tour Eiffel",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. 
        Curabitur non nulla tellus. Nulla facilisi. Aenean suscipit odio elit, et rutrum nisi rutrum et. Nullam nec convallis justo. 
        Mauris et laoreet turpis. In maximus rutrum magna non mattis. Integer venenatis gravida ex, quis faucibus massa congue ut. 
        Proin placerat semper hendrerit. Ut id massa mauris.`,
        activities: [
            { id: 1, type: 'Museum', icon: cultureIcon },
            { id: 2, type: 'Adventure', icon: adventureIcon },
            { id: 3, type: 'Détente', icon: relaxationIcon },
            { id: 5, type: 'Fête', icon: partyIcon },
            { id: 4, type: 'Sport', icon: sportIcon }],
        owner_firstname: "Émilie",
        owner_lastname: "Deparis",
        owner_profile_picture: "https://docs.material-tailwind.com/img/face-2.jpg",
        pin_image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    }

    function computeAverageRating(): number {
        const averageRating = pinReviews.length > 0 ? pinReviews.reduce((sum, review) => sum + review.rating, 0) / pinReviews.length : 0;
        return averageRating;
    }

    const pinReviews: PinReview[] = [
        {
            user_firstname: "Michel",
            user_lastname: "Dupoitou",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-1.jpg",
            rating: 4,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas fringilla dui eu maximus. Curabitur non nulla tellus.",
            pin_image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
            user_firstname: "Éloïse",
            user_lastname: "Debordeaux",
            user_profile_picture: "https://docs.material-tailwind.com/img/face-3.jpg",
            rating: 2,
            comment: "",
            pin_image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
    ]

    const data = [
        {
            label: "Détail",
            value: "detail",
            desc:
                <>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <Typography variant="h2" className="font-title text-2xl text-black">{pinInfoData.title}</Typography>
                        <div>
                            {
                                pinInfoData.activities.map((activity) => (
                                    <Avatar src={activity.icon} alt={activity.type} size="sm" className="ms-1"></Avatar>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-6">
                        <Avatar src={pinInfoData.owner_profile_picture} alt={pinInfoData.owner_firstname + ' ' + pinInfoData.owner_lastname} />
                        <Typography variant="h3" className="text-md text-black ms-3">Créé par {pinInfoData.owner_firstname + ' ' + pinInfoData.owner_lastname}</Typography>
                    </div>
                    <div className="mt-4">
                        <Typography variant="paragraph" className="text-black">{pinInfoData.description}</Typography>
                    </div>
                </>,
        },
        {
            label: "Avis",
            value: "review",
            desc:
                <>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <Typography variant="h2" className="font-title text-2xl text-black">{pinInfoData.title}</Typography>
                        <Rating value={computeAverageRating()} ratedColor="green" />
                    </div>
                    {
                        pinReviews ? pinReviews.map((review) => (
                            <div className="mt-6">
                                <div className="flex flex-row items-start">
                                    <Avatar src={review.user_profile_picture} alt={review.user_firstname + ' ' + review.user_lastname} />
                                    <div className="ml-3">
                                        <Typography className="text-black">{review.user_firstname + ' ' + review.user_lastname}</Typography>
                                        <Rating value={review.rating} />
                                    </div>
                                </div>
                                <div>
                                    <Typography>{review.comment}</Typography>
                                </div>
                            </div>
                        )) : <Typography variant="lead" className="text-black">Il n'y a pas encore d'avis sur ce marqueur</Typography>
                    }
                </>,
        },
    ];

    return (
        <>
            <ThemeProvider value={carouselTheme}>
                <Carousel>
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`image ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    ))}
                </Carousel>
            </ThemeProvider>
            <Tabs>
                <TabsHeader>
                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            <div className="flex items-center gap-2">
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </>
    );
}
