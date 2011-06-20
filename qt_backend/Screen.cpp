#include "Screen.h"

#include <QTextEdit>
#include <QLabel>

Screen::Screen(QWidget* parent, const QString& title) 
  : QWidget(parent)
{
}

void Screen::addLabel(const QString& title) 
{
  new QLabel(title, this);
}

void Screen::addTextEdit(const QString& defaultText) 
{
  new QTextEdit(this);
}
