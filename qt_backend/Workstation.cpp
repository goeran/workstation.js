#include "Workstation.h"
#include "Screen.h"

#include <cassert>

Workstation::Workstation(QWidget* parent) 
  : QWidget(parent)
{
}

void Workstation::addScreen(const QString& title)
{
  screens.push_back(new Screen(this, title));
}

Screen* Workstation::getScreen(unsigned int index)
{
  assert(index < getNScreens() && "Invalid index");
  return screens[index];
}

unsigned int Workstation::getNScreens() const
{
  return screens.size();
}

void Workstation::run() 
{
  // Resize to show the contents
  if (getNScreens() > 0u)
    resize(300, 300);
}
