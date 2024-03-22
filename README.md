# Sims 2 Hood Generation
A website for Sims 2 gamers to generate households for a new neighbourhood.

## To Do
 - [ ] Be able to generate a single adult sim
   - [x] Randomise skin, eye, and hair colour
   - [x] Randomise name, gender, and weight
   - [x] Randomise personality (50 points spent across 5 traits, max 10 per trait)
   - [x] ~Determine zodiac from personality~
     - This is a more complex task than initially thought, as the game's handling of a personality equally similar to two zodiac signs is unclear
   - [x] ~Determine aspiration from zodiac~
   - [ ] Randomise turn-ons and turn-offs
 - [ ] Be able to generate a household of 1-6 sims
   - [ ] Ensure household has at least one adult (future: toggleable)
   - [ ] Assume relationships between sims (all children are offspring of adults; all household members are related)
   - [ ] Do not generate zodiac or appearance for sims generated in same household as a parent
   - [ ] If there are offspring and only one parent, generate a temporary adult to pass on genetics
 - [ ] Be able to generate 1-6 households independently
   - [ ] Instead of generating a random number of households, let user select number of households
 - [ ] Be able to download information as a text file