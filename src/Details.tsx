import { useQuery } from "@tanstack/react-query";

import personPlaceholder from "@ui5/webcomponents-icons/dist/person-placeholder";
import pictureIcon from "@ui5/webcomponents-icons/dist/picture";
import {
  Avatar,
  AvatarShape,
  AvatarSize,
  DynamicPageHeader,
  DynamicPageTitle,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  Grid,
  Label,
  Link,
  ObjectPage,
  ObjectPageSection,
  RatingIndicator,
  Text,
  Timeline,
  TimelineItem,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "./App.tsx";
import allMovies from "./assets/mockData/movies.json";
import movieLogo1 from "./assets/moviePictograms/clapperboard_blue.png";
import movieLogo1dark from "./assets/moviePictograms/clapperboard_blue_dark.png";
import movieLogo2 from "./assets/moviePictograms/clapperboard_green.png";
import movieLogo2dark from "./assets/moviePictograms/clapperboard_green_dark.png";
import movieLogo3 from "./assets/moviePictograms/clapperboard_orange.png";
import movieLogo3dark from "./assets/moviePictograms/clapperboard_orange_dark.png";
import movieLogo4 from "./assets/moviePictograms/clapperboard_purple.png";
import movieLogo4dark from "./assets/moviePictograms/clapperboard_purple_dark.png";
import person1 from "./assets/personPictograms/person1.svg";
import person1dark from "./assets/personPictograms/person1_dark.svg";
import person2 from "./assets/personPictograms/person2.png";
import person2dark from "./assets/personPictograms/person2_dark.png";
import person3 from "./assets/personPictograms/person3.png";
import person3dark from "./assets/personPictograms/person3_dark.png";
import person4 from "./assets/personPictograms/person4.png";
import person4dark from "./assets/personPictograms/person4_dark.png";
import person5 from "./assets/personPictograms/person5.png";
import person5dark from "./assets/personPictograms/person5_dark.png";

import { revenueFormatter } from "./utils.ts";

interface Actor {
  name: string;
  character: string;
}

interface Details {
  id: string;
  title: string;
  revenue: number;
  actors: Actor[];
  summary: string;
  year: number;
}

interface Review {
  comment: string;
  name: string;
  rating: number;
  timestamp: string;
}

const movieAvatars = [movieLogo1, movieLogo2, movieLogo3, movieLogo4];

const movieAvatarsDark = [
  movieLogo1dark,
  movieLogo2dark,
  movieLogo3dark,
  movieLogo4dark,
];

const personAvatars = [person1, person2, person3, person4, person5];

const personAvatarsDark = [
  person1dark,
  person2dark,
  person3dark,
  person4dark,
  person5dark,
];

export const Details = () => {
  const { movieId } = useParams();
  const theme = useContext(ThemeContext);
  const isDarkMode = theme.includes("dark") || theme.includes("hcb");
  const movieImages = isDarkMode ? movieAvatarsDark : movieAvatars;
  const personImages = isDarkMode ? personAvatarsDark : personAvatars;

  const data: Details | undefined = allMovies!.find(
    (item) => item.id === movieId,
  );

  const loadReviews = async () => {
    if (movieId == null) {
      return [];
    }
    const json = await import(`./assets/mockData/reviews/${movieId}.json`);
    return json.default;
  };

  const { data: reviewData } = useQuery<Review[]>(
    [`reviews-${movieId}`],
    loadReviews,
  );

  return (
    <>
      <ObjectPage
        style={{ height: "100%" }}
        image={
          <Avatar icon={pictureIcon}>
            {data?.id != null && (
              <img
                src={movieImages[parseInt(data?.id) % 4]}
                alt="Movie Thumbnail"
              />
            )}
          </Avatar>
        }
        headerTitle={
          <DynamicPageTitle
            header={data?.title}
            subHeader={
              data?.revenue && (
                <>
                  <Label showColon>Revenue</Label>{" "}
                  <Text>{revenueFormatter.format(data.revenue)}</Text>
                </>
              )
            }
            showSubHeaderRight={false}
          >
            <RatingIndicator
              readonly
              value={
                reviewData
                  ? reviewData?.reduce((acc, review) => {
                      acc += review.rating;
                      return acc;
                    }, 0) / reviewData.length
                  : undefined
              }
            />
          </DynamicPageTitle>
        }
        headerContent={
          <DynamicPageHeader>
            <FlexBox direction={FlexBoxDirection.Column}>
              <Link>Official Trailer</Link>
              <Link>Buy Online</Link>
            </FlexBox>
          </DynamicPageHeader>
        }
      >
        <ObjectPageSection id="summary" titleText="Summary">
          <Text>{data?.summary}</Text>
        </ObjectPageSection>
        <ObjectPageSection id="actors" titleText="Main Actors">
          <Grid defaultSpan="XL6 L6 M6 S12">
            {data?.actors?.map((item, index) => (
              <FlexBox alignItems={FlexBoxAlignItems.Center} key={item.name}>
                <Avatar
                  size={AvatarSize.L}
                  style={{ marginInlineEnd: "0.5rem" }}
                  shape={AvatarShape.Square}
                >
                  <img src={personImages[index % 6]} alt="Picture of Actor" />
                </Avatar>
                <FlexBox direction={FlexBoxDirection.Column}>
                  <Text
                    style={{ fontFamily: ThemingParameters.sapFontBoldFamily }}
                  >
                    {item.name}
                  </Text>
                  <Label>{item.character}</Label>
                </FlexBox>
              </FlexBox>
            ))}
          </Grid>
        </ObjectPageSection>
        <ObjectPageSection id="reviews" titleText="Reviews">
          <Timeline>
            {reviewData?.map((item) => {
              const date = new Date(item.timestamp);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <TimelineItem
                  key={item.timestamp}
                  name={item.name}
                  subtitleText={formattedDate}
                  icon={personPlaceholder}
                >
                  <FlexBox direction={FlexBoxDirection.Column}>
                    <Text renderWhitespace>{item.comment}</Text>
                    {item.rating && (
                      <RatingIndicator value={item.rating} readonly />
                    )}
                  </FlexBox>
                </TimelineItem>
              );
            })}
          </Timeline>
        </ObjectPageSection>
      </ObjectPage>
    </>
  );
};
