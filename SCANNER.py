import sys
import os

theme = 'theme'


def dread(dir):
    if os.path.exists(dir) and os.path.isdir(dir):
        for item in os.listdir(dir):
            joined = os.path.join(dir, item)
            if os.path.isdir(joined):
                dread(joined)
            elif os.path.isfile(joined):
                if joined.endswith('.jsx') or joined.endswith('.js'):
                    with open(joined, 'r', encoding='utf-8') as file_:
                        lines = file_.readlines()
                        for line in lines:
                            if line.find(theme) != -1:
                                print(joined, 'at line:', lines.index(line) + 1)
                            else:
                                continue
                else:
                    pass
    else:
        pass


if __name__ == "__main__":
    dread('./front/src')
