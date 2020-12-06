const initTour = (hiders) => {
    let hidingTours = [];
    hiders.forEach(() => {
      hidingTours.push([]);
    });
    return hidingTours;
};

export default initTour