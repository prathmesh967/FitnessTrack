import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { 
  PlayCircle, 
  Close, 
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  CheckCircle,
  CheckCircleOutline,
  Info,
  Timer,
  FitnessCenter as EquipmentIcon
} from "@mui/icons-material";
import { 
  Button, 
  Chip, 
  Modal,
  Tooltip,
  List,
  ListItem,
  Divider
} from "@mui/material";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px;
  gap: 20px;
  overflow-y: scroll;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const TutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const TutorialCard = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.text_secondary + "20"};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PlayIcon = styled(PlayCircle)`
  position: absolute;
  color: white;
  font-size: 48px !important;
  opacity: 0.9;
`;

const TutorialInfo = styled.div`
  padding: 16px;
`;

const TutorialTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const TutorialMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  margin-bottom: 12px;
`;

const DifficultyChip = styled(Chip)`
  &.MuiChip-root {
    height: 24px;
    font-size: 12px;
  }
`;

const VideoModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.bg_primary};
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 1000px;
  position: relative;
`;

const CloseButton = styled(Button)`
  position: absolute !important;
  right: 10px;
  top: 10px;
  min-width: 40px !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  &:hover {
    background: rgba(0, 0, 0, 0.7) !important;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  margin-bottom: 20px;
`;

const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
`;

const VideoDescription = styled.div`
  color: ${({ theme }) => theme.text_primary};
  margin-top: 16px;
  line-height: 1.6;
`;

const ThumbnailPreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  cursor: pointer;
  
  &:hover .play-icon {
    transform: scale(1.1);
  }
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 20px 0;
`;

const CategoryCard = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.primary};
`;

const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const CategoryDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.5;
`;

const BackButton = styled(Button)`
  margin-bottom: 20px !important;
  text-transform: none !important;
`;

const VideoActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ActionButton = styled(Button)`
  text-transform: none !important;
  gap: 8px !important;
`;

const InfoButton = styled(Button)`
  position: absolute !important;
  right: 60px;
  top: 10px;
  min-width: 40px !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  &:hover {
    background: rgba(0, 0, 0, 0.7) !important;
  }
`;

const ExerciseInfo = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 8px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoListItem = styled.li`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
  }
`;

const ProgressIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const categories = [
  {
    id: "legs",
    title: "Legs",
    description: "Exercises targeting quadriceps, hamstrings, calves, and glutes",
    icon: "🦵",
    videos: [
      {
        id: 1,
        title: "Perfect Squat Form Guide",
        videoId: "YaXPRqUwItQ",
        duration: "12:30",
        difficulty: "Beginner",
        views: "15K",
        description: "Learn the proper form for squats with detailed technique breakdown"
      },
      {
        id: 2,
        title: "Leg Press Mastery",
        videoId: "IZxyjW7MPJQ",
        duration: "10:15",
        difficulty: "Intermediate",
        views: "12K",
        description: "Master the leg press machine with proper form"
      }
    ]
  },
  {
    id: "back",
    title: "Back",
    description: "Exercises for lats, traps, and overall back strength",
    icon: "💪",
    videos: [
      {
        id: 3,
        title: "Deadlift Technique Mastery",
        videoId: "op9kVnSso6Q",
        duration: "15:45",
        difficulty: "Intermediate",
        views: "22K",
        description: "Master the deadlift with proper form and technique"
      },
      {
        id: 4,
        title: "Pull-up Tutorial",
        videoId: "eGo4IYlbE5g",
        duration: "11:20",
        difficulty: "Advanced",
        views: "18K",
        description: "Learn how to do perfect pull-ups"
      }
    ]
  },
  {
    id: "chest",
    title: "Chest",
    description: "Exercises for pectoral muscles and chest development",
    icon: "🏋️",
    videos: [
      {
        id: 5,
        title: "Complete Push-up Tutorial",
        videoId: "IODxDxX7oi4",
        duration: "8:15",
        difficulty: "Beginner",
        views: "30K",
        description: "Step by step guide to perfect push-ups"
      },
      {
        id: 6,
        title: "Proper Bench Press Form",
        videoId: "rT7DgCr-3pg",
        duration: "14:20",
        difficulty: "Intermediate",
        views: "25K",
        description: "Learn correct bench press technique and form"
      }
    ]
  },
  {
    id: "arms",
    title: "Arms",
    description: "Exercises for biceps, triceps, and forearm strength",
    icon: "💪",
    videos: [
      {
        id: 7,
        title: "Bicep Curl Mastery",
        videoId: "ykJmrZ5v0Oo",
        duration: "9:45",
        difficulty: "Beginner",
        views: "20K",
        description: "Master the bicep curl with proper form and technique"
      },
      {
        id: 8,
        title: "Tricep Extension Guide",
        videoId: "nRiNZDlQYWg",
        duration: "8:30",
        difficulty: "Beginner",
        views: "15K",
        description: "Learn proper tricep extension technique"
      }
    ]
  },
  {
    id: "core",
    title: "Core",
    description: "Exercises for abs, obliques, and overall core strength",
    icon: "🎯",
    videos: [
      {
        id: 9,
        title: "Core Strength Workout",
        videoId: "2pLT-olgUJs",
        duration: "15:00",
        difficulty: "Intermediate",
        views: "25K",
        description: "Build a strong core with these effective exercises"
      },
      {
        id: 10,
        title: "Plank Variations",
        videoId: "ASdvN_XEl_c",
        duration: "10:45",
        difficulty: "Beginner",
        views: "18K",
        description: "Master different plank variations for core strength"
      }
    ]
  },
  {
    id: "shoulders",
    title: "Shoulders",
    description: "Exercises for deltoids and shoulder stability",
    icon: "🏋️",
    videos: [
      {
        id: 11,
        title: "Shoulder Press Guide",
        videoId: "3VcKaXpzqRo",
        duration: "11:15",
        difficulty: "Intermediate",
        views: "16K",
        description: "Learn proper shoulder press technique"
      },
      {
        id: 12,
        title: "Lateral Raise Tutorial",
        videoId: "3VcKaXpzqRo",
        duration: "9:30",
        difficulty: "Beginner",
        views: "14K",
        description: "Master the lateral raise for shoulder development"
      }
    ]
  }
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "#4CAF50";
    case "Intermediate":
      return "#FF9800";
    case "Advanced":
      return "#f44336";
    default:
      return "#757575";
  }
};

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [savedVideos, setSavedVideos] = useState([]);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Load saved and completed videos from localStorage
    const saved = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    const completed = JSON.parse(localStorage.getItem('completedVideos') || '[]');
    setSavedVideos(saved);
    setCompletedVideos(completed);
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setShowInfo(false);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setShowInfo(false);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setSelectedDifficulty("All");
  };

  const toggleSaveVideo = (videoId) => {
    const newSavedVideos = savedVideos.includes(videoId)
      ? savedVideos.filter(id => id !== videoId)
      : [...savedVideos, videoId];
    
    setSavedVideos(newSavedVideos);
    localStorage.setItem('savedVideos', JSON.stringify(newSavedVideos));
  };

  const toggleCompleteVideo = (videoId) => {
    const newCompletedVideos = completedVideos.includes(videoId)
      ? completedVideos.filter(id => id !== videoId)
      : [...completedVideos, videoId];
    
    setCompletedVideos(newCompletedVideos);
    localStorage.setItem('completedVideos', JSON.stringify(newCompletedVideos));
  };

  const filteredVideos = selectedCategory?.videos.filter((video) => {
    return selectedDifficulty === "All" || video.difficulty === selectedDifficulty;
  }) || [];

  const getVideoInfo = (video) => {
    return {
      equipment: ["Dumbbells", "Bench", "Resistance Bands"],
      steps: [
        "Start with proper stance and grip",
        "Maintain neutral spine throughout movement",
        "Control the weight during both concentric and eccentric phases",
        "Focus on proper breathing technique",
        "Complete full range of motion"
      ],
      commonMistakes: [
        "Using momentum instead of controlled movement",
        "Poor posture and spine alignment",
        "Incomplete range of motion",
        "Holding breath during exercise"
      ],
      alternatives: [
        "Machine-based variation",
        "Bodyweight alternative",
        "Cable machine variation"
      ]
    };
  };

  return (
    <Container>
      <Title>Exercise Tutorials</Title>
      
      {selectedCategory ? (
        <>
          <BackButton
            startIcon={<ArrowBack />}
            onClick={handleBackClick}
            variant="text"
          >
            Back to Categories
          </BackButton>
          
          <FilterContainer>
            {["All", "Beginner", "Intermediate", "Advanced"].map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "contained" : "outlined"}
                size="small"
                onClick={() => setSelectedDifficulty(difficulty)}
                style={{ textTransform: "none" }}
              >
                {difficulty}
              </Button>
            ))}
          </FilterContainer>

          <TutorialGrid>
            {filteredVideos.map((video) => (
              <TutorialCard 
                key={video.id}
                onClick={() => handleVideoSelect(video)}
              >
                {completedVideos.includes(video.id) && (
                  <ProgressIndicator>
                    <CheckCircle style={{ fontSize: 16 }} />
                    Completed
                  </ProgressIndicator>
                )}
                <ThumbnailContainer>
                  <ThumbnailPreview>
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <PlayIconWrapper className="play-icon">
                      <PlayIcon />
                    </PlayIconWrapper>
                  </ThumbnailPreview>
                </ThumbnailContainer>
                <TutorialInfo>
                  <TutorialTitle>{video.title}</TutorialTitle>
                  <TutorialMeta>
                    <span>{video.duration}</span>
                    <span>•</span>
                    <span>{video.views} views</span>
                  </TutorialMeta>
                  <DifficultyChip
                    label={video.difficulty}
                    size="small"
                    style={{
                      backgroundColor: getDifficultyColor(video.difficulty) + "20",
                      color: getDifficultyColor(video.difficulty),
                      borderRadius: "4px",
                    }}
                  />
                </TutorialInfo>
              </TutorialCard>
            ))}
          </TutorialGrid>
        </>
      ) : (
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              onClick={() => setSelectedCategory(category)}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}

      <VideoModal
        open={!!selectedVideo}
        onClose={handleCloseModal}
        aria-labelledby="video-modal"
      >
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>
            <Close />
          </CloseButton>
          <InfoButton onClick={() => setShowInfo(!showInfo)}>
            <Info />
          </InfoButton>
          {selectedVideo && (
            <>
              <VideoContainer>
                <VideoFrame
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoContainer>
              <VideoDescription>
                <h2>{selectedVideo.title}</h2>
                <p>{selectedVideo.description}</p>
                <div style={{ marginTop: '16px' }}>
                  <DifficultyChip
                    label={selectedVideo.difficulty}
                    size="small"
                    style={{
                      backgroundColor: getDifficultyColor(selectedVideo.difficulty) + "20",
                      color: getDifficultyColor(selectedVideo.difficulty),
                      borderRadius: "4px",
                    }}
                  />
                  <span style={{ marginLeft: '12px', color: '#666' }}>
                    {selectedVideo.duration} • {selectedVideo.views} views
                  </span>
                </div>
                <VideoActions>
                  <ActionButton
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveVideo(selectedVideo.id);
                    }}
                  >
                    {savedVideos.includes(selectedVideo.id) ? (
                      <>
                        <Bookmark />
                        Saved
                      </>
                    ) : (
                      <>
                        <BookmarkBorder />
                        Save for Later
                      </>
                    )}
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompleteVideo(selectedVideo.id);
                    }}
                  >
                    {completedVideos.includes(selectedVideo.id) ? (
                      <>
                        <CheckCircle />
                        Completed
                      </>
                    ) : (
                      <>
                        <CheckCircleOutline />
                        Mark as Completed
                      </>
                    )}
                  </ActionButton>
                </VideoActions>
                {showInfo && (
                  <ExerciseInfo>
                    <InfoSection>
                      <InfoTitle>
                        <EquipmentIcon />
                        Equipment Needed
                      </InfoTitle>
                      <InfoList>
                        {getVideoInfo(selectedVideo).equipment.map((item, index) => (
                          <InfoListItem key={index}>{item}</InfoListItem>
                        ))}
                      </InfoList>
                    </InfoSection>
                    <InfoSection>
                      <InfoTitle>
                        <Timer />
                        Steps
                      </InfoTitle>
                      <InfoList>
                        {getVideoInfo(selectedVideo).steps.map((step, index) => (
                          <InfoListItem key={index}>{step}</InfoListItem>
                        ))}
                      </InfoList>
                    </InfoSection>
                    <InfoSection>
                      <InfoTitle>Common Mistakes to Avoid</InfoTitle>
                      <InfoList>
                        {getVideoInfo(selectedVideo).commonMistakes.map((mistake, index) => (
                          <InfoListItem key={index}>{mistake}</InfoListItem>
                        ))}
                      </InfoList>
                    </InfoSection>
                    <InfoSection>
                      <InfoTitle>Alternative Exercises</InfoTitle>
                      <InfoList>
                        {getVideoInfo(selectedVideo).alternatives.map((alt, index) => (
                          <InfoListItem key={index}>{alt}</InfoListItem>
                        ))}
                      </InfoList>
                    </InfoSection>
                  </ExerciseInfo>
                )}
              </VideoDescription>
            </>
          )}
        </ModalContent>
      </VideoModal>
    </Container>
  );
};

export default Tutorials; 