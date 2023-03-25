import { useState, useEffect } from "react";
import {
    ChakraProvider,
    Flex,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageUploader from "./ImageUploader.jsx";

function App() {
    const [cards, setCards] = useState([
        { id: "card-1", content: "Card 1" },
        { id: "card-2", content: "Card 2" },
        { id: "card-3", content: "Card 3" },
        { id: "card-4", content: "Card 4" },
    ]);
    const [newCards, setNewCards] = useState([]);
    const [styleProps, setStyleProps] = useState({
        fontSize: "16px",
        color: "black",
        fontWeight: "normal",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(selectedCard ? selectedCard.content : "");
    }, [selectedCard]);

    const onDragEnd = (result) => {
        console.log(result)
        if (!result.destination) {
            return;
        }

        if (
            result.source.droppableId === "cards" &&
            result.destination.droppableId === "new-cards"
        ) {
            const newCard = cards[result.source.index];
            setNewCards((prevState) => [...prevState, newCard]);
            setCards((prevState) =>
                prevState.filter((_, index) => index !== result.source.index)
            );
        } else if (
            result.source.droppableId === "new-cards" &&
            result.destination.droppableId === "cards"
        ) {
            const newCard = newCards[result.source.index];
            setCards((prevState) => [...prevState, newCard]);
            setNewCards((prevState) =>
                prevState.filter((_, index) => index !== result.source.index)
            );
        }
    };

    const handleAddCard = (card) => {
        setNewCards((prevCards) => [...prevCards, card]);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsOpen(true);
    };

    const handleStyleChange = (propName, propValue) => {
        if (selectedCard) {
            setStyleProps((prevState) => ({
                ...prevState,
                [propName]: propValue,
            }));
            const updatedCard = {
                ...selectedCard,
                style: { ...selectedCard.style, [propName]: propValue },
            };
            setCards((prevState) =>
                prevState.map((c) => (c.id === selectedCard.id ? updatedCard : c))
            );
            setNewCards((prevState) =>
                prevState.map((c) => (c.id === selectedCard.id ? updatedCard : c))
            );
        }
    };


    const handleContentChange = (e) => {
        setContent(e.target.value);
    };


    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSaveCard = () => {
        const newCard = { ...selectedCard, content: content, style: styleProps };
        setCards((prevState) =>
            prevState.map((c) => (c.id === selectedCard.id ? newCard : c))
        );
        setNewCards((prevState) =>
            prevState.map((c) => (c.id === selectedCard.id ? newCard : c))
        );
        setIsOpen(false);

        // Update font size of selected card
        if (selectedCard && styleProps.fontSize) {
            const cardElement = document.getElementById(selectedCard.id);
            if (cardElement) {
                cardElement.style.fontSize = styleProps.fontSize;
            }
        }
    }



    return (
            <ChakraProvider>
                <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                    <Text fontSize={styleProps.fontSize} color={styleProps.color} fontWeight={styleProps.fontWeight}>Task completed Click the card to edit it <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Scroll down for Image</Text>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Flex marginTop="4">
                            <Droppable droppableId="cards">
                                {(provided) => (
                                    <Flex
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        marginRight="8"
                                        backgroundColor="gray.100"
                                        borderRadius="md"
                                        padding="4"
                                        height="fit-content"
                                    >
                                        {cards.map((card, index) => (
                                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                                {(provided) => (
                                                    <Flex
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        backgroundColor="white"
                                                        borderRadius="md"
                                                        padding="4"
                                                        margin="4"
                                                        marginBottom="4"
                                                        onClick={() => handleCardClick(card)}
                                                    >
                                                        <Text
                                                            fontSize={selectedCard && selectedCard.style ? selectedCard.style.fontSize : styleProps.fontSize}
                                                            color={selectedCard && selectedCard.style ? selectedCard.style.color : styleProps.color}
                                                            fontWeight={selectedCard && selectedCard.style ? selectedCard.style.fontWeight : styleProps.fontWeight}
                                                        >
                                                            {card.content}
                                                        </Text>
                                                    </Flex>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Flex>
                                )}
                            </Droppable>
                            <Droppable droppableId="new-cards">
                                {(provided) => (
                                    <Flex
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        backgroundColor="gray.100"
                                        borderRadius="md"
                                        padding="4"
                                        height="fit-content"
                                    >
                                        {newCards.map((card, index) => (
                                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                                {(provided) => (
                                                    <Flex
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        backgroundColor="white"
                                                        borderRadius="md"
                                                        padding="4"
                                                        margin="4"
                                                        marginBottom="4"
                                                        onClick={() => handleCardClick(card)}
                                                    >
                                                        <Text
                                                            fontSize={selectedCard && selectedCard.style ? selectedCard.style.fontSize : styleProps.fontSize}
                                                            color={selectedCard && selectedCard.style ? selectedCard.style.color : styleProps.color}
                                                            fontWeight={selectedCard && selectedCard.style ? selectedCard.style.fontWeight : styleProps.fontWeight}
                                                        >
                                                            {card.content}
                                                        </Text>
                                                    </Flex>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Flex>
                                )}
                            </Droppable>
                        </Flex>
                    </DragDropContext>
                    <Button marginTop="4" onClick={() => handleAddCard({ id: `card-${cards.length + newCards.length + 1}`, content: `Card ${cards.length + newCards.length + 1}` })}>Add Card</Button>

                    <Modal isOpen={isOpen} onClose={handleCloseModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit Card</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex flexDirection="column">
                                    <Text fontSize="lg" marginBottom="2">
                                        Content:
                                    </Text>
                                    <Textarea value={content} onChange={handleContentChange} />
                                    <Text fontSize="lg" marginTop="4" marginBottom="2">
                                        Font Size:
                                    </Text>
                                    <Input
                                        value={styleProps.fontSize}
                                        onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                                    />
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleCloseModal}>Cancel</Button>
                                <Button colorScheme="blue" marginLeft="2" onClick={handleSaveCard}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>




                </Flex>
                <ImageUploader />

            </ChakraProvider>
        );
    }
    export default App
